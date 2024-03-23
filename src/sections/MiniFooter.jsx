import React from "react";

const MiniFooter = () => {
  return (
    <div className="copyright_container">
      <div className="copyright_grid">
        <div className="copyright_div">
          <div className="copyright_description">
            Regulated activities are carried out on behalf of the Capital
            International Group by its licensed member companies. Full company
            details, website terms and privacy &amp; cookie notice can be viewed{" "}
            <span>here</span>.
          </div>
        </div>
        <div className="copyright_cookies">
          <span>Cookie preferences</span>
        </div>
        <div className="copyright">
          © Capital International Group, 2024
        </div>
      </div>
    </div>
  );
};

export default MiniFooter;
