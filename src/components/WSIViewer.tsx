
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { mockDetectionResults, DetectionResults } from "../data/mockDetectionResults";
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Sample slide image
const SAMPLE_IMAGE_URL = "/lovable-uploads/c92c7961-b941-4595-a365-6e44ddaa65fb.png";

const WSIViewer: React.FC = () => {
  const [data, setData] = useState<DetectionResults>(mockDetectionResults);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mainViewRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const currentDate = format(new Date(), 'EEE MMM dd yyyy HH:mm:ss');

  // Handle mouse wheel for zooming
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(scale + delta, 3));
    setScale(newScale);
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) { // Left click only
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const dx = (e.clientX - dragStart.x) / scale;
      const dy = (e.clientY - dragStart.y) / scale;
      setPosition({
        x: position.x + dx,
        y: position.y + dy
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Update viewport indicator position
  useEffect(() => {
    if (viewportRef.current && mainViewRef.current) {
      const mainView = mainViewRef.current.getBoundingClientRect();
      const viewportWidth = 100 / scale;
      const viewportHeight = 100 / scale;
      
      viewportRef.current.style.width = `${viewportWidth}px`;
      viewportRef.current.style.height = `${viewportHeight}px`;
      viewportRef.current.style.transform = `translate(${-position.x * 0.2}px, ${-position.y * 0.2}px)`;
    }
  }, [position, scale]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-2 px-4 rounded-t-lg border-b border-gray-200">
        <div className="text-center text-gray-700 font-semibold">{currentDate}</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Findings Panel */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-auto">
          <div className="p-2">
            <Button variant="outline" className="mb-4 w-12 h-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            {/* RBC Section */}
            <div className="mb-4">
              <div className="bg-green-100 text-center font-semibold py-1">RBC</div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-2 py-1 text-sm text-left">Type</th>
                    <th className="border border-gray-300 px-2 py-1 text-sm text-right">Count</th>
                    <th className="border border-gray-300 px-2 py-1 text-sm text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data.summary.rbc).map(([key, value]) => (
                    <tr key={key}>
                      <td className="border border-gray-300 px-2 py-1 text-sm">{key}</td>
                      <td className="border border-gray-300 px-2 py-1 text-sm text-right">{value.count}</td>
                      <td className="border border-gray-300 px-2 py-1 text-sm text-right">{value.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* WBC Section */}
            <div className="mb-4">
              <div className="bg-green-100 text-center font-semibold py-1">WBC</div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-2 py-1 text-sm text-left">Type</th>
                    <th className="border border-gray-300 px-2 py-1 text-sm text-right">Count</th>
                    <th className="border border-gray-300 px-2 py-1 text-sm text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data.summary.wbc).map(([key, value]) => (
                    <tr key={key}>
                      <td className="border border-gray-300 px-2 py-1 text-sm">{key}</td>
                      <td className="border border-gray-300 px-2 py-1 text-sm text-right">{value.count}</td>
                      <td className="border border-gray-300 px-2 py-1 text-sm text-right">{value.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Platelets Section */}
            <div>
              <div className="bg-green-100 text-center font-semibold py-1">Platelets</div>
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1 text-sm">Count</td>
                    <td className="border border-gray-300 px-2 py-1 text-sm text-right">{data.summary.platelets.Count}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1 text-sm">Percentage</td>
                    <td className="border border-gray-300 px-2 py-1 text-sm text-right">{data.summary.platelets.Percentage}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex h-full">
            {/* Main WSI View */}
            <div className="flex-1 relative overflow-hidden p-4">
              <div
                ref={mainViewRef}
                className="relative w-full h-full overflow-hidden border border-gray-200 rounded-lg cursor-move"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div
                  className="relative origin-center"
                  style={{
                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <img
                    src={SAMPLE_IMAGE_URL}
                    alt="Whole Slide Image"
                    className="min-w-full min-h-full object-cover"
                  />
                  
                  {/* Render bounding boxes */}
                  {data.detections.map((detection, index) => (
                    <div
                      key={index}
                      className="absolute border-2 border-blue-500 pointer-events-none"
                      style={{
                        left: `${detection.x}px`,
                        top: `${detection.y}px`,
                        width: `${detection.width}px`,
                        height: `${detection.height}px`,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={() => setScale(prev => Math.min(prev + 0.1, 3))}
                    className="h-8 w-8 rounded-full p-0 shadow-md"
                  >
                    +
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
                    className="h-8 w-8 rounded-full p-0 shadow-md"
                  >
                    -
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 text-gray-700 font-medium">
                  {`WSI Zoomed IN View`}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Hub View & Report Button */}
            <div className="w-64 bg-white border-l border-gray-200 p-4 flex flex-col">
              <Card className="p-2 mb-4">
                <div className="text-center font-semibold mb-2">WSI Zoomed out View (Hub)</div>
                <div className="relative border border-gray-300 h-44 mb-2">
                  <img
                    src={SAMPLE_IMAGE_URL}
                    alt="Hub View"
                    className="w-full h-full object-cover"
                  />
                  {/* Viewport indicator */}
                  <div
                    ref={viewportRef}
                    className="absolute border-2 border-red-500 pointer-events-none"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-sm">
                  <div>Patient ID</div>
                  <div className="font-medium">{data.summary.patient.id}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>Sample</div>
                  <div className="font-medium">{data.summary.patient.type}</div>
                </div>
              </Card>
              
              <div className="mt-auto">
                <Button className="w-full" size="lg">
                  Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WSIViewer;
