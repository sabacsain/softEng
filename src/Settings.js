import Header from "./Header";
import Toggle from "./Toggle";
import "./css/settings.css";

export default function Settings({
  isDarkMode,
  handleMode,
  handleFontSize,
  currentFontSize,
}) {
  return (
    <div className={'settings'}>
      <Header headerName={"Settings"} />
      <div className="body">
        <div className="display-settings-wrapper">
          <div id="display-header">
            <h1 className="h1-settings">Display</h1>
          </div>

          {/* dark or light mode settings */}
          <div className="display-content-wrapper">
            <div className="display-content">
              <div className="settings-wrap">
                <div class="settings-label">Dark Mode</div>
                <Toggle value={isDarkMode} handleToggleValue={handleMode} />
              </div>
            </div>

            {/* font size settings */}
            <div className="display-content">
              <div className="settings-wrap">
                <div class="settings-label">Font Size</div>
                <select
                  id="settings-font"
                  onChange={handleFontSize}
                  value={currentFontSize}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
