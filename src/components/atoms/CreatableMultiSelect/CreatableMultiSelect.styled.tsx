import {GroupBase, StylesConfig, ThemeConfig} from 'react-select';

import styled from 'styled-components';

import {Option} from '@models/form';

import Colors from '@styles/Colors';

export const StyledOption = styled.div`
  padding: 6px 12px;

  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${Colors.slate700};
  }
`;

export const StyledMultiLabel = styled.div`
  padding: 3px 5px;
`;

export const customStyles: StylesConfig<Option, true, GroupBase<Option>> = {
  input: styles => ({...styles, color: Colors.slate200, fontWeight: 400}),
  valueContainer: styles => ({...styles, backgroundColor: Colors.slate800}),
  placeholder: styles => ({...styles, color: Colors.slate500, fontWeight: 400}),
  control: styles => ({
    ...styles,
    borderColor: 'transparent',
    backgroundColor: Colors.slate800,
    height: '44px',
  }),
  indicatorSeparator: styles => ({...styles, width: 0}),
  dropdownIndicator: styles => ({
    ...styles,
    color: Colors.slate500,
    '&:hover': {
      color: Colors.slate400,
    },
  }),
  menu: styles => ({...styles, backgroundColor: Colors.slate800}),
  menuList: styles => ({...styles, padding: 0}),
  multiValue: styles => ({
    ...styles,
    background: 'transparent',
    border: `1px solid ${Colors.slate700}`,
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: Colors.slate200,
    fontWeight: 400,
    fontSize: 12,
  }),
  multiValueRemove: styles => ({
    ...styles,
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
  }),
  noOptionsMessage: styles => ({
    ...styles,
    fontWeight: 400,
    color: Colors.slate200,
  }),
  option: styles => ({
    ...styles,
    padding: '6px 12px',
    fontWeight: 400,
    fontSize: 14,
    color: Colors.slate200,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: Colors.slate700,
    },
  }),
};

export const customTheme: ThemeConfig = theme => {
  const {colors, ...rest} = theme;

  return {
    ...rest,
    borderRadius: 4,
    colors: {
      ...colors,
      primary: Colors.indigo400,
      primary25: Colors.slate700,
      neutral30: Colors.slate600,
    },
  };
};
