import React from "react";
import { List, Viewer } from "./components";
import { ReportDefinition } from "@grapecity/activereports/reportdesigner";
import { AppMode, ReportDescriptior } from "./types";
import "./App.css";
import themes from "./themes.json";
import reports from "./reports.json";
import { useThemes, useDesigner } from "./hooks";
import "@grapecity/activereports/styles/ar-js-designer.css";
import "@grapecity/activereports/styles/ar-js-viewer.css";
import "@grapecity/activereports/styles/ar-js-ui.css";


export const App = () => {
  const reportMap = React.useRef<ReportDescriptior[]>(
    reports.map((report) => ({ ...report }))
  );
  const [mode, setMode] = React.useState<AppMode>("viewer");
  const [themeIndex, setThemeIndex, themeCss] = useThemes(themes);
  const [reportIndex, setReportIndex] = React.useState<number>(0);
  

  const handleOnRender = (data: ReportDefinition): Promise<void> => {
    reportMap.current[reportIndex].definition = data.definition;
    setMode("viewer");
    return Promise.resolve();
  };
  
  useDesigner({report: reportMap.current[reportIndex], onRender: handleOnRender, hostElem: "#arjs-designer-host"} );

  const renderReportsList = (
    <List
      title="Reports"
      items={reports.map((report) => report.label)}
      currentItemIndex={reportIndex}
      selectionChanged={(index) => setReportIndex(index)}
    />
  );

  const renderThemesList = (
    <List
      title="Themes"
      items={themes.map((theme) => theme.name)}
      currentItemIndex={themeIndex}
      selectionChanged={(index) => setThemeIndex(index)}
    />
  );

  return (
    <>
      <div id="app" className={themes[themeIndex].id}>
        <div id="list-host">
          <div className="flex-grow-1">{renderReportsList}</div>
          <div className="flex-grow-0">{renderThemesList}</div>
        </div>
        <div id="host">
          <div id="arjs-designer-host" className={mode === "viewer" ? "hidden" : ""}>
          </div>
          <div id="arjs-viewer-host" className={mode === "designer" ? "hidden" : ""}>
            <Viewer
              report={reportMap.current[reportIndex]}
              onEdit={() => setMode("designer")}
            />
          </div>
        </div>
      </div>
      {themeCss.map((html, key) => (
        <style
          type="text/css"
          key={`ar-js-style-${key}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </>
  );
};
