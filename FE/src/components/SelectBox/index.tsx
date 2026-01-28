import React from 'react';
import { Select } from 'antd';
// import { FaBook } from 'react-icons/fa';

import styles from './Select.module.css';
import { DefaultOptionType } from 'antd/es/select';

const { Option } = Select;

type OptionData = {
  value: string | number,
  label: string
}
type Props = {
  options: OptionData[],
  value: string | number,
  onChange: (value: string | number, option?: DefaultOptionType | DefaultOptionType[] | undefined) => void,
  height?: string,
  placeholder: string,
  width?: string,
  hasIcon?: boolean,
  variant?: "borderless" | "outlined" | "filled" | "underlined" | undefined,
  popupMinWidth?: string,
  border?: string,
  zIndex?: string,
}

const MySelect = ({
    options,
    value,
    onChange,
    height = 'auto',
    placeholder,
    width = '200px',
    hasIcon = false,
    variant = "borderless",
    popupMinWidth = '180px',
    border = 'var(--color-orange-main',
    zIndex= '9999',
} : Props) => {
    return (
        <div >
            {/* {hasIcon && <FaBook style={{ marginRight: '10px', color: '#888' }} />} */}
            <Select
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ width: width, border: `1px solid ${border}`, borderRadius: '5px', height: height }}
                variant={variant}
                styles={{
                    popup: {
                        root: {
                            minWidth: popupMinWidth,
                            border: `1px solid ${border}`,
                            zIndex: zIndex
                        }
                    }
                }}
                className={styles.customSelectOrangeBorder}
            >
                {options.map(opt => (
                    <Option key={opt.value} value={opt.value}>
                        {opt.label}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default MySelect;