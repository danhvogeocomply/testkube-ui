import {useContext, useEffect, useState} from 'react';

import {Select, Tabs} from 'antd';

import {Entity} from '@models/entity';
import {Option as OptionType} from '@models/form';

import {useAppSelector} from '@redux/hooks';
import {selectRedirectTarget} from '@redux/reducers/configSlice';

import {TestRunnerIcon} from '@atoms';

import {Button, Text} from '@custom-antd';

import {CLICommands, LabelsList} from '@molecules';

import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {displayDefaultErrorNotification} from '@utils/notification';

import {useRunTestSuiteMutation} from '@services/testSuites';
import {useRunTestMutation} from '@services/tests';

import Colors from '@styles/Colors';

import {AnalyticsContext, EntityDetailsContext, MainContext} from '@contexts';

import {StyledContainer, StyledPageHeader, TabsWrapper} from './EntityDetailsContent.styled';
import ExecutionsTable from './ExecutionsTable';
import Settings from './Settings';
import SummaryGrid from './SummaryGrid';

const filterOptions: OptionType[] = [
  {value: 7, label: 'Last 7 days', key: 'last7Days'},
  {value: 30, label: 'Last 30 days', key: 'last30Days'},
  {value: 90, label: 'Last 90 days', key: 'last90Days'},
  {value: 365, label: 'This year', key: 'thisYear'},
  {value: 0, label: 'All days', key: 'allDays'},
];

const EntityDetailsContent: React.FC = () => {
  const {entity, entityDetails, defaultStackRoute, metrics, daysFilterValue, setDaysFilterValue, isRowSelected} =
    useContext(EntityDetailsContext);
  const {analyticsTrack} = useContext(AnalyticsContext);
  const {navigate} = useContext(MainContext);

  const {isSettingsTabConfig} = useAppSelector(selectRedirectTarget);

  const [runTest] = useRunTestMutation();
  const [runTestSuite] = useRunTestSuiteMutation();

  const runRequestsMap: {[key in Entity]: any} = {
    'test-suites': runTestSuite,
    tests: runTest,
  };

  const [activeTabKey, setActiveTabKey] = useState('Executions');

  useEffect(() => {
    if (isSettingsTabConfig) {
      setActiveTabKey('Settings');
    }
  }, [isSettingsTabConfig]);

  useTrackTimeAnalytics(`${entity}-details`, activeTabKey !== 'Settings');
  useTrackTimeAnalytics(`${entity}-settings`, activeTabKey === 'Settings');

  const name = entityDetails?.name;
  const description = entityDetails?.description;
  const labels = entityDetails?.labels;
  const type = entityDetails?.type;

  const onRunButtonClick = async () => {
    const runEntity = runRequestsMap[entity];

    runEntity({
      id: name,
      data: {
        namespace: 'testkube',
      },
    })
      .then((result: any) => {
        if (result.error) {
          return displayDefaultErrorNotification(result.error.error);
        }

        analyticsTrack('trackEvents', {
          type,
          event: `run-${entity}`,
        });
      })
      .catch((err: any) => displayDefaultErrorNotification(err));
  };

  const avatar = type
    ? {
        avatar: {icon: <TestRunnerIcon icon={type} noWidth />},
      }
    : {};

  const isMetricsEmpty = !metrics?.executions || !metrics?.executions.length;

  const isPageDisabled = !name;

  return (
    <StyledContainer>
      <StyledPageHeader
        onBack={() => navigate(defaultStackRoute)}
        title={name || 'Loading...'}
        subTitle={labels ? <LabelsList labels={entityDetails?.labels} /> : ''}
        extra={[
          !isMetricsEmpty ? (
            <Select
              placeholder="Last 7/30/90/Year/All days"
              options={filterOptions}
              style={{width: 250}}
              value={daysFilterValue}
              onChange={setDaysFilterValue}
              key="days-filter-select"
            />
          ) : null,
          <Button key="run-now-button" type="primary" onClick={onRunButtonClick} disabled={isPageDisabled}>
            Run now
          </Button>,
        ]}
        className="testkube-pageheader"
        {...avatar}
      >
        {description ? (
          <Text color={Colors.slate400} className="middle">
            {description}
          </Text>
        ) : null}
      </StyledPageHeader>
      {!isMetricsEmpty ? <SummaryGrid metrics={metrics} isRowSelected={isRowSelected} /> : null}
      <TabsWrapper activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        <Tabs.TabPane tab="Recent executions" key="Executions" disabled={isPageDisabled}>
          <ExecutionsTable triggerRun={onRunButtonClick} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="CLI Commands" key="CLICommands" disabled={isPageDisabled}>
          <CLICommands name={name} bg={Colors.slate800} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Settings" key="Settings" disabled={isPageDisabled}>
          <Settings />
        </Tabs.TabPane>
      </TabsWrapper>
    </StyledContainer>
  );
};

export default EntityDetailsContent;
