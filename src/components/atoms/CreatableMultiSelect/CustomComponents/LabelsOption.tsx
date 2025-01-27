import {OptionProps} from 'react-select';

import {Option} from '@models/form';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledOption} from '../CreatableMultiSelect.styled';
import {SplittedLabel} from '../utils';

const LabelsOption = (props: OptionProps<Option>) => {
  // @ts-ignore
  const {children, innerRef, innerProps, options, value} = props;

  const isChildren = typeof children === 'string';

  const allowClick =
    isChildren && options[0].label === children && children !== value
      ? Boolean(children.match(/(Create (.+:.*))/g))
      : true;

  const modifyChildren = () => {
    if (!isChildren) {
      return children;
    }

    if (children.includes(' ')) {
      return (
        <Text color={Colors.slate100} className="regular">
          {children}
        </Text>
      );
    }

    if (children.includes(':')) {
      return <SplittedLabel value={children} />;
    }

    return (
      <Text color={Colors.slate200} className="regular">
        {children}
      </Text>
    );
  };

  if (allowClick) {
    return (
      // @ts-ignore
      <StyledOption ref={innerRef} {...innerProps}>
        {modifyChildren()}
      </StyledOption>
    );
  }

  return (
    // @ts-ignore
    <StyledOption ref={innerRef}>{modifyChildren()}</StyledOption>
  );
};

export default LabelsOption;
