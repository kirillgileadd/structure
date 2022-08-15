import React, { useLayoutEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";
import "./OrgChart.scss";

import ArrowDownIcon from "../assets/img/arrow-down.png";
import DoorLockIcon from "../assets/img/door-lock-line.svg";
import ChatVoiceIcon from "../assets/img/chat-voice-line.svg";
import QuestionAnswerIcon from "../assets/img/question-answer-line.svg";
import MTBCircleIcon from "../assets/img/mtb-cirle.svg";

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;
  const addNode = (node) => {
    chart.addNode(node);
    console.log("node", node);
  };
  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (!props.data) return;
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .rootMargin(100)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 270)
        .childrenMargin((d) => 130)
        .compactMarginBetween((d) => 75)
        .compactMarginPair((d) => 80)
        .buttonContent(
          ({ node, state }) =>
            `
          <img src=${ArrowDownIcon} 
            alt="" class="button_str_arrow" 
            style="display: flex; justify-content: center; align-items: center; width: 20px; height: 20px; 
            margin: 20px 0 0 10px;"
          /> `
        )
        .linkUpdate(function (d, i, arr) {
          d3.select(this)
            .attr("stroke", (d) =>
              d.data._upToTheRootHighlighted ? "#152785" : "lightgray"
            )
            .attr("stroke-width", (d) =>
              d.data._upToTheRootHighlighted ? 5 : 1.5
            )
            .attr("stroke-dasharray", "4,4");

          if (d.data._upToTheRootHighlighted) {
            d3.select(this).raise();
          }
        })
        .onNodeClick((d, i, arr) => props.onNodeClick(d))
        .nodeContent((data) => {
          const colors = [
            "#6E6B6F",
            "#18A8B6",
            "#F45754",
            "#96C62C",
            "#BD7E16",
            "#802F74",
          ];
          const color = colors[data.depth % colors.length];
          const imageDim = 80;
          const lightCircleDim = 95;
          const outsideCircleDim = 110;

          return `
          <div class=${data.data.id == props.chosenNode ? "bodydiv": ""}>
          <div class=${data.data.id == props.chosenNode ? "c-subscribe-box u-align-center": ""}>
          <div class=${data.data.id == props.chosenNode ? "rainbow": ""}><span></span><span></span></div>
          <div class=${data.data.id == props.chosenNode ? "c-subscribe-box__wrapper": ""}>
          
          


          <div 
            style="
            background: #F7FAFC;
            border-radius: 5px;
            display:flex; flex-direction : column; justify-content: center; text-align: center; "
          >

          

            <div 
              style="display: flex; 
              flex-direction : row; 
              justify-content: space-between; 
              align-items: center;   
              height: 20px; margin: 5px 5px 0px 5px;"
            >
              <img              
                src=${MTBCircleIcon}
                alt="Money Icon"
              />
            
              <p style="color: #61D64A; font-weight: 500; font-size: 14px; line-height: 14px; margin: 2px;">
                online
              </p>

              <img              
                src=${DoorLockIcon}
                alt="Door lock Icon"
              />
            </div>
            
            <p style="color: #13599F; font-weight: 500; font-size: 14px; line-height: 14px;  margin: 2px;">
              id-${data.data.id} 
            </p>

            <p style="color: #B1B1B1; font-weight: 500; font-size: 14px; line-height: 14px;  margin: 2px;">
              22/05/14 12:32
            </p>
               

            <div 
              style="background-color:#F7FAFC; margin: 0 auto; 
              display:flex; justify-content: center; text-align: center; width: 125px; hight: 125px "
            >
              <img 
                src="https://myphotoshop.ru/wp-content/uploads/2021/02/krugloe-foto-10.png"
                   
                style="margin-top:8px; border-radius:100px; 
                width: 125px; hight: 125px " 
              />
            </div>

            <div 
              class="card" style="margin-top:12px; height:20px; 
              
              background-color:#3AB6E3;"
            >
              <div 
                style="background-color:${color}; height:28px; text-align:center; 
                padding-top:5px; 
                color:#ffffff; font-weight:bold; font-size:16px"
              >
                ${data.data.name}
              </div>  
            </div>
            
            <div 
              style="display: flex; 
              flex-direction : row; 
              justify-content: space-between; 
              align-items: center;   height: 20px; 
              margin: 10px 5px 5px 5px;"
            >
              <img              
                src=${ChatVoiceIcon}
                alt="Chat voice Icon"
              />             

              <img              
                src=${QuestionAnswerIcon}
                alt="Question Icon"
              />
            </div>      
          </div>


        </div>
        </div>
        </div>
        </div>
        </div>
            `;
        })
        .render();
    }
  }, [props, d3Container.current]);

  return <div className={"svg_container"} ref={d3Container} />;
};
