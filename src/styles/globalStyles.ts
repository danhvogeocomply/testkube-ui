import {createGlobalStyle} from 'styled-components';

import Colors, {BackgroundColors} from '@styles/Colors';

export const invisibleScroll = `
&::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari and Opera */
-ms-overflow-style: none; /* IE and Edge */
scrollbar-width: none; /* Firefox */
`;

export const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    
    background: ${BackgroundColors.mainBackground};
  }

  h1,
  h2,
  h3 {
    margin: 0 !important;
  }

  h1.ant-typography.dashboard-title {
    font-size: 34px;
    font-weight: 700;
    line-height: 40px;
  }

  h2.ant-typography.dashboard-title {
    font-size: 28px;
    font-weight: 700;
    line-height: 32px;
  }

  h3.ant-typography.dashboard-title {
    font-weight: 500;
    line-height: 30px;
  }

  .regular {
    font-weight: 400;
  }

  .normal {
    font-weight: 500;
  }

  .bold {
    font-weight: 700;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .text-center {
    text-align: center;
  }

  .ant-layout-content {
    display: flex;
    flex-direction: column;
  }

  .running-icon {
    animation-name: spin;
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .ant-tabs-content-holder {
    // overflow: auto;

    .ant-tabs-content {
      height: 100%;
    }
  }

  .ant-avatar {
    display: flex;

    overflow: unset;
  }

  .ant-empty-description {
    color: ${Colors.slate200};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  // Tabs

  .ant-tabs {
    color: ${Colors.slate400};
    
    font-weight: 500;

    .ant-tabs-nav {
      &::before {
        border-bottom: unset !important;
      }
    }
  }

  // Select

  .ant-select-arrow {
    color: ${Colors.slate500};
  }

  .ant-select-clear {
    color: ${Colors.slate500};
  }

  .ant-select-multiple .ant-select-selection-item-remove {
    color: ${Colors.slate200};
    margin-top: 1px;
    margin-left: 2px;
  }

  // Input

  .ant-input-password-icon.anticon {
    color: ${Colors.slate500};

    &:hover {
      color: ${Colors.slate500};
    }
  }

  // Notification

  .ant-notification-notice {
    padding-bottom: 24px;

    .ant-notification-notice-close-x {
      color: ${Colors.slate500};
    }
  }

  // Table

  .ant-table-tbody > tr > td {
    border-radius: 4px;

    border: 1px solid ${Colors.slate800};
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;

    transition: 0.3s;
    cursor: pointer;

    &:hover {
      border: 1px solid ${Colors.purple};
    }
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    border: 1px solid ${Colors.purple};

    transition: 0.3s;
  }

  table tr td.ant-table-selection-column {
    display: none;
  }

  // Pagination

  .ant-table-pagination.ant-pagination {
    margin: 0 !important;
    padding: 32px 0 !important;
  }

  .ant-pagination-item {
    border: 1px solid ${Colors.greyBorder};

    background: ${Colors.slate900};

    a {
      color: #dbdbdb;
    }

    &-active {
      border-color: ${Colors.purple};

      a {
        color: ${Colors.purple};
      }
    }

    &:hover {
      border-color: ${Colors.purple};

      a {
        color: ${Colors.purple};
      }
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      border: 1px solid ${Colors.greyBorder};

      color: #dbdbdb;
      background: transparent;

      span {
        path {
          fill: #dbdbdb;
        }
      }
    }

    &:hover {
      .ant-pagination-item-link {
        border-color: ${Colors.purple};

        color: ${Colors.purple};
        background: transparent;
      }

      span {
        path {
          fill: ${Colors.purple};
        }
      }
    }
  }

  .ant-pagination-disabled {
    .ant-pagination-item-link {
      border: 1px solid ${Colors.greyBorder} !important;

      background: #262626 !important;

      span {
        path {
          fill: ${Colors.greyBorder};
        }
      }
    }
  }

  .ant-table {
    background: transparent;
  }

  .ant-pagination-item-container {
    .ant-pagination-item-link-icon,
    .ant-pagination-item-ellipsis {
      color: ${Colors.purple} !important;
    }
  }

  .ant-page-header-heading-title {
    line-height: 38px !important;
  }

  .ant-form-item-optional {
    color: ${Colors.whitePure} !important;
  }
`;

/* Media Sizes */
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

/* Devices */

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
