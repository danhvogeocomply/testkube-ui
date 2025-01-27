import React from 'react';

import {Option} from '@models/form';

import {CreatableMultiSelect} from '@atoms';
import {LabelsMultiValueLabel, LabelsOption} from '@atoms/CreatableMultiSelect/CustomComponents';

import {PollingIntervals} from '@utils/numbers';

import {useGetLabelsQuery} from '@services/labels';

type LabelsSelectProps = {
  onChange: (value: readonly Option[]) => void;
  defaultLabels?: {[key: string]: string};
  options?: {[key: string]: string[]};
};

const LabelsSelect: React.FC<LabelsSelectProps> = props => {
  const {onChange, defaultLabels, options} = props;

  const {data} = useGetLabelsQuery(null, {pollingInterval: PollingIntervals.default, skip: Boolean(options)});

  const formattedDefaultLabels = Object.entries(defaultLabels || {}).map(([key, value]) => {
    const labelString = `${key}${value ? `:${value}` : ''}`;
    return {
      label: labelString,
      value: labelString,
    };
  });

  const formattedOptions = Object.entries(options || data || {})
    .map(([key, value]) => {
      return value.map((item: any) => {
        const labelString = `${key}${item ? `:${item}` : ''}`;
        return {
          label: labelString,
          value: labelString,
        };
      });
    })
    .flat();

  return (
    <CreatableMultiSelect
      onChange={onChange}
      placeholder="Add or create new labels"
      formatCreateLabel={(inputString: string) => {
        if (inputString.includes(':')) {
          return `Create ${inputString}`;
        }
        return 'Create: You need to add a : separator to create this label';
      }}
      defaultValue={formattedDefaultLabels}
      options={formattedOptions}
      CustomOptionComponent={LabelsOption}
      CustomMultiValueLabelComponent={LabelsMultiValueLabel}
      validateCreation={inputValue => Boolean(inputValue.match(/(.+:.*)/g))}
    />
  );
};

export default LabelsSelect;
