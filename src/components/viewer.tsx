import React from "react";
import {
  Viewer as ReportViewer,
  RDLReportDefinition,
} from "@grapecity/activereports-react";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/xlsxexport";

export interface ViewerProps {
  report: string | RDLReportDefinition;
  onEdit: () => void;
}

export const Viewer = ({ report, onEdit }: ViewerProps) => {
  const ref = React.useRef<ReportViewer>(null);

  React.useEffect(() => {
    const viewerInstance = ref.current?.Viewer;
    if (!viewerInstance) return;
    // Adding a toolbar item
    viewerInstance.toolbar.addItem({
      key: "$openDesigner",
      text: "Edit in Designer",
      iconCssClass: "mdi mdi-pencil",
      enabled: true,
      action: () => onEdit(),
    });
    // Setting the toolbar layout
    viewerInstance.toolbar.updateLayout({
      default: [
        "$openDesigner",
        "$split",
        "$navigation",
        "$split",
        "$refresh",
        "$split",
        "$history",
        "$split",
        "$zoom",
        "$fullscreen",
        "$split",
        "$print",
        "$split",
        "$singlepagemode",
        "$continuousmode",
        "$galleymode",
      ],
    });
    viewerInstance.open(report);
  }, [report, ref]);

  return <ReportViewer ref={ref} report={{ Uri: report as any }} />;
};
