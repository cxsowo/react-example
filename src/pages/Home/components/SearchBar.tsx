import React, { MutableRefObject, useRef, useState } from 'react';
import classNames from 'classnames';
import { useKeyPress, useThrottleFn } from 'ahooks';
import { trim } from 'lodash';
import CloseIcon from 'icons/CloseIcon';
import SearchIcon from 'icons/SearchIcon';
import Styles from './SearchBar.less';

interface SearchBarProps {
  className?: string;
}

function SearchBar({ className }: SearchBarProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef() as MutableRefObject<any>;

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onClear = () => {
    setValue('');
    inputRef.current?.focus?.();
  };

  // const { data, run, error, loading } = useRequest(getUsername, {
  //   retryCount: 3
  // });

  const { run: onSearch } = useThrottleFn(() => {
    console.log('================searching', value);
  });

  useKeyPress(['enter'], () => {
    console.log('==========press', inputRef.current);
    if (focused) {
      onSearch();
    }
  });

  return (
    <div className={classNames(Styles.searchBar, className)}>
      <div className={Styles.inputContainer}>
        <input
          className={Styles.input}
          value={value}
          maxLength={150}
          onChange={onChange}
          ref={inputRef}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {Boolean(value) && (
          <div className={Styles.clearIcon} onClick={onClear}>
            <CloseIcon />
          </div>
        )}
      </div>
      <button
        type="button"
        disabled={!trim(value)}
        onClick={onSearch}
        className={Styles.searchButton}
      >
        <div className={Styles.searchButtonText}>SEARCH</div>
        <div className={Styles.searchButtonIcon}>
          <SearchIcon />
        </div>
      </button>
    </div>
  );
}

export default React.memo(SearchBar);
