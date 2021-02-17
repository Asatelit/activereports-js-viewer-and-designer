import React, { useState } from "react";
import { Designer, Viewer, List, ListItemProp } from "./components";
import { RDLReportDefinition } from "@grapecity/activereports-react";
import { ReportDefinition } from "@grapecity/activereports/reportdesigner";
import reports from "./reports.json";
import themes from "./themes.json";
import "@grapecity/activereports/styles/ar-js-designer.css";
import "@grapecity/activereports/styles/ar-js-viewer.css";
import "@grapecity/activereports/styles/ar-js-ui.css";
import "./App.css";

type Modes = "designer" | "viewer";

interface Defenitions {
  [key: string]: RDLReportDefinition;
}

export const App = () => {
  const [mode, setMode] = React.useState<Modes>("viewer");
  const [defenitions, setDefenitions] = useState<Defenitions>({});
  const [themeCss, setThemeCss] = useState<string[]>([]);

  const [theme, setTheme] = useState<ListItemProp>({
    name: themes[0].name,
    value: themes[0].class,
  });

  const [report, setReport] = React.useState<ListItemProp>({
    name: reports[0].name,
    value: reports[0].src,
  });

  React.useEffect(() => {
    const applyTheme = async () => {
      const designer = import(`!!raw-loader!@grapecity/activereports/styles/${theme.value}-designer.css`);
      const viewer = import(`!!raw-loader!@grapecity/activereports/styles/${theme.value}-viewer.css`);
      const ui = import(`!!raw-loader!@grapecity/activereports/styles/${theme.value}-ui.css`);
      const styles = await Promise.all([designer, viewer, ui]);
      setThemeCss(styles.map((style) => style.default || ""));
    };
    if (theme.value !== 'ar-js') {
      applyTheme()
    } else {
      setThemeCss([]);
    };
  }, [theme]);

  const handleOnRender = (data: ReportDefinition): Promise<void> => {
    setDefenitions({ ...defenitions, [report.name]: data.definition });
    setMode("viewer");
    return Promise.resolve();
  };

  const renderReportsList = (
    <List
      title="Reports"
      items={reports.map((item) => ({
        name: item.name,
        value: item.src,
      }))}
      currentItem={report}
      selectionChanged={(report) => setReport(report)}
    />
  );

  const renderThemesList = (
    <List
      title="Themes"
      items={themes.map((item) => ({
        name: item.name,
        value: item.class,
      }))}
      currentItem={theme}
      selectionChanged={(theme) => setTheme(theme)}
    />
  );

  return (
    <>
      <div id="app" className={theme.value}>
        <div id="list-host">
          <div className="flex-grow-1">{renderReportsList}</div>
          <div className="flex-grow-0">{renderThemesList}</div>
        </div>
        <div id="host">
          {mode === "designer" && (
            <Designer
              report={{
                id: report.value,
                displayName: report.name,
                definition: defenitions[report.name],
              }}
              onRender={handleOnRender}
            />
          )}
          {mode === "viewer" && (
            <Viewer
              report={defenitions[report.name] || report.value}
              onEdit={() => setMode("designer")}
            />
          )}
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
