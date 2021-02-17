import React from "react";
import {
  Designer as ReportDesigner,
  Report,
  ReportDefinition,
} from "@grapecity/activereports/reportdesigner";

export interface DesignerProps {
  report: Report;
  onRender: (report: ReportDefinition) => Promise<void>;
}

export const Designer = ({ report, onRender }: DesignerProps) => {
  const [designer, setDesigner] = React.useState<ReportDesigner>();
 
  React.useEffect(() => {
    const reportDesigner = new ReportDesigner("#arjs-designer-host");
    setDesigner(reportDesigner);
    reportDesigner.setActionHandlers({ onRender });
    reportDesigner.setReport(report);
  }, []);

  React.useEffect(() => {
    if (!designer) return;
    designer.setReport(report);
  }, [report]);

  return <div id="arjs-designer-host" />;
};
