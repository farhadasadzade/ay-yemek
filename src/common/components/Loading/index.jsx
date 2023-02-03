import React from "react";
import { RenderIf } from "common/components";
import { useUpdateEffect } from "ahooks";

const Loading = ({ isLoading, children }) => {
  useUpdateEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [isLoading]);

  return (
    <>
      <RenderIf condition={isLoading}>
        <div className="loading">
          <div class="loader"></div>
        </div>
      </RenderIf>
      {children}
    </>
  );
};

export default Loading;
