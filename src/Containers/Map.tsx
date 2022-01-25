import React, { useRef, useState, useEffect } from "react";
import { DrawingManager } from "@react-google-maps/api";

type propsMap = {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  isDrawing: boolean;
};

const Map = ({ center, zoom, isDrawing = true }: propsMap) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  useEffect(() => {
    if (ref.current) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: { lat: center.lat, lng: center.lng },
          zoom,
        })
      );
    }
    if (map) {
      if (isDrawing && map) {
        const drawingManager = new google.maps.drawing.DrawingManager();
        console.log(drawingManager);
        if (drawingManager) {
          drawingManager.setMap(map);
          drawingManager.setOptions({
            drawingControl: true,
          });
        }
        // .drawing.DrawingManager({
        //   drawingMode: google.maps.drawing.OverlayType.MARKER,
        //   drawingControl: true,
        //   drawingControlOptions: {
        //     position: google.maps.ControlPosition.TOP_CENTER,
        //     drawingModes: [
        //       google.maps.drawing.OverlayType.MARKER,
        //       google.maps.drawing.OverlayType.CIRCLE,
        //       google.maps.drawing.OverlayType.POLYGON,
        //       google.maps.drawing.OverlayType.POLYLINE,
        //       google.maps.drawing.OverlayType.RECTANGLE,
        //     ],
        //   },
        //   markerOptions: {
        //     icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        //   },
        //   circleOptions: {
        //     fillColor: "#ffff00",
        //     fillOpacity: 1,
        //     strokeWeight: 5,
        //     clickable: false,
        //     editable: true,
        //     zIndex: 1,
        //   },
        // });
      }
    }
  }, [center.lat, map]);

  return <div ref={ref} style={{ height: "500px", width: "100%" }} />;
};

export { Map };
