import React, { useState } from "react";

import Tippy from "@tippyjs/react";
import { Down } from "neetoicons";

import LinkOption from "./LinkOption";
import Option from "./Option";
import {
  getNodeType,
  getTextMenuDefaultOptions,
  getTextMenuDropdownOptions,
} from "./utils";

const TextOptions = ({
  editor,
  options,
  setIsInvalidLink,
  isLinkOptionActive,
  setIsLinkOptionActive,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fixedOptions = getTextMenuDefaultOptions({
    editor,
    setIsLinkOptionActive,
  }).filter(({ optionName }) => options.includes(optionName));
  const dropdownOptions = getTextMenuDropdownOptions({ editor });
  const nodeType = getNodeType(dropdownOptions);

  const handleAnimateInvalidLink = () => {
    setIsInvalidLink(true);
    setTimeout(() => {
      setIsInvalidLink(false);
    }, 1000);
  };

  const handleClose = () => setIsDropdownOpen(false);

  if (isLinkOptionActive) {
    return (
      <LinkOption
        editor={editor}
        handleAnimateInvalidLink={handleAnimateInvalidLink}
        handleClose={() => setIsLinkOptionActive(false)}
      />
    );
  }

  return (
    <>
      <Tippy
        interactive
        arrow={false}
        placement="bottom"
        visible={isDropdownOpen}
        content={
          <div className="neeto-editor-bubble-menu__dropdown">
            {dropdownOptions.map(({ optionName, command }) => (
              <button
                className="neeto-editor-bubble-menu__item neeto-editor-bubble-menu__dropdown-item"
                key={optionName}
                type="button"
                onClick={() => {
                  command();
                  handleClose();
                }}
              >
                {optionName}
              </button>
            ))}
          </div>
        }
        onClickOutside={handleClose}
      >
        <button
          className="neeto-editor-bubble-menu__item neeto-editor-bubble-menu__dropdown-target"
          type="button"
          onClick={() => setIsDropdownOpen(open => !open)}
        >
          {nodeType}
          <Down size={14} />
        </button>
      </Tippy>
      {fixedOptions.map(option => (
        <Option {...option} key={option.optionName} />
      ))}
    </>
  );
};

export default TextOptions;
