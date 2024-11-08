import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Text, Image, Transformer } from 'react-konva';
import useImage from 'use-image';

const Canvas = ({ name, message, file, color = {} }) => {
  const [stageWidth, setStageWidth] = useState(window.innerWidth / 2);
  const [stageHeight, setStageHeight] = useState(window.innerHeight - 190);
  const [image] = useImage(file); // Use useImage to handle image loading
  const [selectedNode, setSelectedNode] = useState(null);
  const [transformerVisible, setTransformerVisible] = useState(false);
  const [imageWarning, setImageWarning] = useState('');
  
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const stageRef = useRef(null);
  const nameTransformerRef = useRef(null);
  const messageTransformerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight - 120);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (!stageRef.current) return;

      const clickedNode = e.target;

      if (clickedNode === stageRef.current) {
        setSelectedNode(null);
        setTransformerVisible(false);
        if (nameTransformerRef.current) {
          nameTransformerRef.current.nodes([]);
        }
        if (messageTransformerRef.current) {
          messageTransformerRef.current.nodes([]);
        }
      } else if (clickedNode === nameRef.current) {
        setSelectedNode(clickedNode);
        setTransformerVisible(true);
      } else if (clickedNode === messageRef.current) {
        setSelectedNode(clickedNode);
        setTransformerVisible(true);
      }
    };

    const handleDblClick = (e) => {
      const textNode = e.target;
      setSelectedNode(textNode);
      setTransformerVisible(true);

      stageRef.current.batchDraw();
    };

    const handleOutsideClick = (e) => {
      if (e.target === stageRef.current) {
        setTransformerVisible(false);
        setSelectedNode(null);
        if (nameTransformerRef.current) {
          nameTransformerRef.current.nodes([]);
        }
        if (messageTransformerRef.current) {
          messageTransformerRef.current.nodes([]);
        }
        stageRef.current.batchDraw();
      }
    };

    if (stageRef.current) {
      stageRef.current.on('click', handleClick);
      stageRef.current.on('dblclick', handleDblClick);
    }

    window.addEventListener('click', handleOutsideClick);

    return () => {
      if (stageRef.current) {
        stageRef.current.off('click', handleClick);
        stageRef.current.off('dblclick', handleDblClick);
      }
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (nameTransformerRef.current && nameRef.current) {
      nameTransformerRef.current.nodes([nameRef.current]);
    }
    if (messageTransformerRef.current && messageRef.current) {
      messageTransformerRef.current.nodes([messageRef.current]);
    }
    stageRef.current.batchDraw();
  }, [selectedNode, transformerVisible]);

  useEffect(() => {
    // Check if image exceeds the rectangle boundaries
    if (image) {
      const imageWidth = image.x;
      const imageHeight = image.y;
      const rectWidth = Math.min(700, stageWidth - 100);
      const rectHeight = Math.min(300, stageHeight - 100);

      if (imageWidth > rectWidth || imageHeight > rectHeight) {
        setImageWarning('Warning: The image exceeds the rectangle boundaries!');
      } else {
        setImageWarning('');
      }
    }
  }, [image, stageWidth, stageHeight]);

  const rectWidth = Math.min(700, stageWidth - 100);
  const rectHeight = Math.min(300, stageHeight - 100);
  const rectX = (stageWidth - rectWidth) / 2;
  const rectY = (stageHeight - rectHeight) / 2;

  return (
    <div>
      <div className="w-full md:w-3/4 sm:w-1/2 h-3/4 mt-10 ml-4 p-4 bg-gray-500 rounded-lg flex justify-center">
        <Stage ref={stageRef} width={stageWidth} height={stageHeight}>
          <Layer>
            <Rect
              x={rectX}
              y={rectY}
              width={rectWidth}
              height={rectHeight}
              fill={color.Background || '#1e1e1e'}
              cornerRadius={10}
              shadowBlur={10}
              shadowColor="black"
              shadowOpacity={0.6}
              shadowOffset={{ x: 10, y: 10 }}
            />
            {image && (
              <Image
                x={rectX + 290}
                y={rectY + 50}
                width={150}
                height={190}
                image={image}
                cornerRadius={10}
                draggable
              />
            )}
            <Text
              ref={nameRef}
              x={rectX + 20}
              y={rectY + 20}
              text={name}
              fontSize={16}
              fontFamily="monospace"
              fill={color.Text || 'gray'}
              width={200}
              height={30}
              padding={12}
              draggable
            />
            {transformerVisible && selectedNode === nameRef.current && (
              <Transformer
                ref={nameTransformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 50 || newBox.height < 20) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
            <Text
              ref={messageRef}
              x={rectX + 20}
              y={rectY + 50}
              text={message}
              fontSize={16}
              fontFamily="monospace"
              fill={color.Text || 'gray'}
              width={200}
              height={30}
              padding={12}
              draggable
            />
            {transformerVisible && selectedNode === messageRef.current && (
              <Transformer
                ref={messageTransformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 50 || newBox.height < 20) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>

      {imageWarning && (
        <div className="text-red-500 mt-4 text-center font-bold">
          {imageWarning}
        </div>
      )}
    </div>
  );
};

export default Canvas;
