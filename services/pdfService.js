const fs = require("fs");
const os = require("os");
const path = require("path");
const Common = require("../common");
const logger = require("../util/logger");
const puppeteer = require("puppeteer");
const AWS = require("aws-sdk");

// Set up AWS credentials
AWS.config.update({
  accessKeyId: process.env.S3_AWS_KEY,
  secretAccessKey: process.env.S3_AWS_SECRET,
  region: process.env.S3_AWS_REGION,
});

// Create an S3 instance
const s3 = new AWS.S3();

module.exports = {
  detailPdfGenerator: async (data) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const htmlContent = `<!DOCTYPE html>

      <script src="/moment.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
      <script src="https://code.jscharting.com/latest/jscharting.js"></script>
      <script type="text/javascript" src="https://code.jscharting.com/latest/modules/types.js"></script>
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <!-- <link rel="stylesheet" href="/style.css"> -->
      </head>
      
      <style>
          body {
              width: 100%;
              margin: auto;
              background-color: #F0F3F8;
              padding: 3px;
              font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          }
      
          input {
              border: 1px solid black;
              border-radius: 10px;
              background: transparent;
          }
      
          select {
              background: transparent;
              border: 1px solid black;
              border-radius: 4px;
              padding: 1px 4px;
              font-size: 20px;
              margin-left: 10px;
              width: 200px;
              text-align: center;
          }
      
          table {
              border-collapse: collapse;
          }
      
          table td,
          table th {
              border: 1.5px black;
              border-style: dashed;
              font-size: 13px;
          }
      
          table tr:first-child th {
              border-top: 0;
          }
      
          table tr:last-child td {
              border-bottom: 0;
          }
      
          table tr td:first-child,
          table tr th:first-child {
              border-left: 0;
          }
      
          table tr td:last-child,
          table tr th:last-child {
              border-right: 0;
          }
      
      
      
      
          .main {
              display: flex;
              flex-direction: column;
              width: 100%;
          }
      
      
      
      
          .main_first {
              display: flex;
              flex-direction: row;
              justify-content: left;
              align-items: center;
              width: 100%;
              z-index: 1;
          }
      
          .main_first_img {
              width: 200px;
          }
      
          .main_first_img img {
              width: 100%;
          }
      
          .main_first_text {
              display: flex;
              flex-direction: column;
              text-align: center;
              justify-content: center;
              text-align: center;
              width: 70%;
          }
      
          .main_first_text_tex1 {
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 0.5cap;
              font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          }
      
          .main_first_text_tex2 {
              font-size: 44px;
              font-weight: bolder;
              color: #F44D2D;
              font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          }
      
          .main_second {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
              font-weight: bold;
          }
      
          .main_second1 {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 50%;
          }
      
          .main_second2 {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: self-start;
              width: 50%;
              z-index: 2;
          }
      
          .main_second2 label {
              font-weight: 100;
              border: 1.5px solid black;
              padding: 1px 6px;
              border-radius: 7px;
              text-align: center;
              width: 150px;
              text-align: center;
          }
      
      
      
          /* FOR SMALL LABEL ON UPPER PART OF PDF */
          .small_label {
              font-size: 12px;
          }
      
      
          .main_second_select1 {
              display: flex;
              margin-bottom: 10px;
              text-align: center;
              align-items: flex-start;
          }
      
          .main_second_select1_check {
              display: flex;
              flex-direction: column;
          }
      
          .myinput.large {
              height: 22px;
              width: 22px;
              background-color: transparent;
          }
      
          .myinput.large[type="checkbox"]:before {
              width: 20px;
              height: 20px;
              position: relative;
              display: block;
              border: 1px solid #808080;
              background: #FFF;
          }
      
          .myinput.large[type="checkbox"]:after {
              top: -20px;
              width: 16px;
              height: 16px;
              position: relative;
              display: block;
          }
      
          .main_second_select1_check div {
              margin-bottom: 10px;
              margin-left: 10px;
              display: flex;
          }
      
          .main_third {
              display: flex;
              flex-direction: column;
              width: 95%;
              margin: auto;
          }
      
          .main_third_text {
              display: flex;
              justify-content: space-around;
              font-size: 13px;
          }
      
          .main_third_line {
              width: 100%;
              height: 1.5px;
              background-color: #7ED957;
              margin-bottom: 15px;
          }
      
          .main_fourth {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
      
          .main_fourth_text1 {
              text-align: center;
              letter-spacing: 0.3cap;
              margin-bottom: 7px;
              font-size: 20px;
              padding: 0px 7px;
          }
      
          .main_fourth_text2 {
              font-weight: bold;
              text-align: center;
              letter-spacing: 0.2cap;
              font-size: 25px;
              margin-top: 5px;
          }
      
          .main_five {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: 30px;
          }
      
          .main_five_head {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              width: 100%;
          }
      
          .main_five_right_head {
              font-size: 27px;
              font-weight: bolder;
              text-decoration: underline;
              letter-spacing: 0.3cap;
              background-color: #683733;
              color:white;
              border-radius: 40px;
              padding: 7px 10px;
          }
      
          .main_five_main {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
      
          .main_five_right_float {
              font-size: 29px;
              font-weight: bolder;
              text-align: center;
              background-color: #FFDE59;
              font-style: italic;
              border-radius: 7px;
              padding: 2px 10px;
              margin-top: 10px;
              color: #09429C;
              margin-bottom: 10px;
              z-index: 1;
          }
      
          .main_five_right_left {
              display: flex;
              width: 90%;
              font-size: 10px;
              justify-content: space-between;
              align-items: center;
              margin: auto;
          }
      
          .main_five_right {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              font-weight: bold;
              width: 45%;
          }
      
          .main_float_line {
              height: 1100px;
              position: absolute;
              width: 0px;
              border-left: 1.5px dashed black;
              left: 50%;
              transform: translateX(-50%);
              top: 400px;
          }
      
          .page1_footer {
              font-size: 10px;
              letter-spacing: 1.3cap;
              text-align: center;
              padding: 3px 3px;
          }
      
      
      
      
      
      
          .main_page2_first {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              margin-top: 10px;
          }
      
          .main_page2_first_table {
              border: 1.5px solid black;
              width: 90%;
              margin: auto;
              text-align: center;
          }
      
          .main_page2_first_table:first-child {
              border: 1.5px solid black;
              width: 90%;
              margin: auto;
              text-align: center;
              margin-bottom: 180px;
          }
      
          .main_page2_first_table tr {
              border: 1.5px solid black;
          }
      
          .main_page2_first_table th {
              border: 1.5px solid black;
              padding: 10px 4px;
              background-color: #C7DDEF;
              font-size: 18px;
          }
      
          .main_page2_first_table td {
              border: 1.5px solid black;
              padding: 10px 4px;
              font-size: 18px;
      
          }
      
          .main_page3_first {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: flex-start;
              margin-top: 5px;
              width: 100%;
              text-align: center;
          }
      
          .main_page3_first_one {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              width: 31%;
          }
      
          .main_page3_first_one_txt {
              font-weight: bold;
              letter-spacing: 0.3cap;
              text-decoration: underline;
              font-size: 21px;
          }
      
          .main_page3_first_one_content {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: baseline;
              margin-top: 10px;
          }
      
          .main_page3_first_one_content_one {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
      
          .main_page3_first_one_content_one_head {
              font-weight: bold;
              font-size: 21px;
              padding: 4px 4px;
              border: 1.4px solid black;
              background-color: white;
              text-align: center;
              border-radius: 4px;
          }
      
          .main_page3_first_one_content_one_buttons {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              margin: 10px 0px;
              font-size: 19px;
          }
      
          .main_page3_first_one_content_one_buttons_button {
              display: flex;
              text-align: center;
              justify-content: center;
              align-items: center;
              background-color: #009299;
              width: auto;
              margin: 4px;
              padding: 2px 7px;
              border-radius: 10px;
              color: white;
              font-weight: 500;
          }
      
          .main_page3_first_one_content_one_buttons_button span {
              margin: 0px 15px 0px 0px !important;
          }
      
          .main_page3_first_one_sub {
              font-size: 10px;
              margin: 3px 0px;
              text-align: center;
          }
      
          .main_page3_first_one_chart canvas {
              max-width: 100%;
          }
      
          .main_page3_first_one_break {
              height: 230px;
              border-left: 1.5px solid gray;
              padding: 0px 2px;
          }
      
      
      
      
      
      
          .main_page3_second {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-start;
              width: 100%;
          }
      
          .main_page3_second_one {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 60%;
          }
      
          .main_page3_first_one_other {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 90%;
          }
      
          .main_page3_first_one_other_one {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
      
          .main_page3_first_one_other_one_main {
              width: 150px;
              height: 150px;
              background-size: contain;
              background-image: url("data:image/png;base64,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");
              background-repeat: no-repeat;
              background-position: center;
              text-align: center;
              vertical-align: middle;
              display: flex;
              justify-content: center;
              align-items: center;
          }
      
          .main_page3_first_one_other_one_text {
              text-align: center;
              font-size: 15px;
              font-weight: bold;
              letter-spacing: 0.3cap;
          }
      
          .main_page3_first_one_other_one_sub {
              font-size: 10px;
              color: gray;
          }
      
          .main_page3_second_two {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-content: center;
              width: 35%;
              padding: 2px 15px;
              text-align: center;
          }
      
          #main_page3_first_one_chart3 {
              max-width: 200px;
              align-self: center;
          }
      
      
      
      
      
      
      
          .main_page3_third {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: flex-start;
              text-align: center;
              width: 100%;
          }
      
          .main_page3_third_one {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 45%;
              padding: 0px 5px;
          }
      
          .main_page3_first_one_sub2 {
              font-size: 12px;
              font-style: italic;
              font-weight: bold;
              margin: 4px 0px;
          }
      
          .main_page3_first_one_main {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-end;
              width: 100%;
          }
      
          .main_page3_first_one_main_head {
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              align-items: flex-end;
              font-weight: bold;
              letter-spacing: 0.3cap;
              width: 100%;
              margin: 5px 0;
          }
      
          .main_page3_first_one_main_head_head:first-child {
              margin-right: 25px;
          }
      
          .main_page3_first_one_main_head_sub {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 24px;
              font-weight: bold;
              width: 100%;
              margin-bottom: 10px;
          }
      
          .main_page3_first_one_main_head_sub_two {
              color: #09429C;
              font-weight: bolder;
              background-color: #FFDE59;
              padding: 3px 10px;
              border-radius: 10px;
              font-style: italic;
          }
      
          .main_page3_first_one_one {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 95%;
              /* margin-top: 20px; */
          }
      
          .main_page3_first_one_one_one {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              font-weight: bolder;
              background-color: white;
              border-radius: 20px;
              padding: 3px 15px;
          }
      
          .main_page3_first_one_one_num {
              font-size: 28px;
          }
      
          .main_page3_first_one_two {
              margin-top: 20px;
          }
      
          .main_page3_first_one_two table {
              font-size: 14px;
          }
      
          .main_page3_first_one_two th {
              padding: 0px 10px;
          }
      
          .main_page3_first_one_two td {
              padding: 10px 10px;
              font-weight: bold;
          }
      
          .bigtd {
              font-size: 30px;
          }
      
          .main_page3_four {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: flex-start;
              width: 100%;
              text-align: center;
      
          }
      
          .main_page3_four_one:first-child {
              width: 45%;
          }
      
          .main_page3_four_one:last-child {
              width: 50%;
          }
      
          .main_page3_first_one_txt_chart {
              width: 100%;
          }
      
          .main_page3_first_one_txt_chart canvas {
              width: 50%;
              max-width: 400px;
          }
      
          .main_page3_first_one_tri {
              display: flex;
              justify-content: center;
              align-items: center;
          }
      
      
      
      
      
      
      
      
      
          .main_page4_first {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              width: 100%;
          }
      
          .main_page4_first_one {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-start;
              margin-top: 20px;
              width: 90%;
          }
      
          .main_page4_first_one_one {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
          }
      
          .main_page4_first_one_one_head {
              font-size: 20px;
              font-weight: bold;
              letter-spacing: 0.3cap;
              text-decoration: underline;
              text-align: center;
              background-color: white;
              border-radius: 10px;
              padding: 5px 7px;
              margin-bottom: 20px;
          }
      
          .main_page4_first_one_one_main {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: flex-start;
          }
      
          .main_page4_first_one_one_main_one {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
          }
      
          .main_page4_first_one_one_main_one_head {
              font-size: 18px;
              text-decoration: underline;
              font-weight: bold;
              letter-spacing: 0.3cap;
          }
      
          .main_page4_first_one_one_main_one_sub {
              font-size: 18px;
              letter-spacing: 0.3cap;
              font-weight: bold;
          }
      
          .main_page4_first_one_one_main_one_chart canvas {
              max-width: 200px;
              display: block;
              height: 200px;
              width: 200px;
          }
      
          #main_page4_first_one_one_main_one_chart12 {
              width: 100%;
              height: 500px;
              max-width: 400px;
          }
      
          #main_page4_first_one_one_main_one_chart13 {
              width: 100%;
              height: 500px;
              max-width: 400px;
          }
      
          .main_page4_first_one:nth-child(2) {
              width: 100% !important;
          }
      
          .main_page4_first_one:nth-child(2) .main_page4_first_one_one {
              width: 50% !important;
          }
      
          .main_page4_first_one_one_main_one_chart {
              display: flex;
              justify-content: center;
              align-items: flex-start;
          }
      
          .main_page4_first_one_one_main_one_chart_bar {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
      
          .main_page4_first_one_one_main_one_chart_bar_big {
              width: 100px;
              height: 70px;
              background-color: #49C3FB;
              display: flex;
              justify-content: center;
              align-items: center;
              vertical-align: middle;
              font-weight: bolder;
          }
      
          .main_page4_first_one_one_main_one_chart_bar_small {
              width: 100px;
              height: 30px;
              background-color: #49C3FB;
              display: flex;
              justify-content: center;
              align-items: center;
              vertical-align: middle;
              font-weight: bolder;
              margin-top: 2px;
          }
      
          .main_page4_first_one_one_main_one_chart_bar_other {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
          }
      
          .main_page4_first_one_one_main_one_chart_bar_other_head {
              font-size: 12px;
              text-decoration: underline;
              font-style: italic;
          }
      
          .main_page4_first_one_one_main_one_chart_bar_other_rate_num {
              /* margin: 0 !important; */
              font-size: 20px;
              font-weight: bold;
          }
      
          .main_page4_first_one_one_main_one_chart_bar_other_rate {
              font-style: italic;
              margin-top: 7px;
          }
      
          .main_page4_first_one_one_main_one_chart_bar_other_rate_who {
              margin: 0 !important;
              font-size: 10px;
              font-weight: bold;
          }
      
          .main_page4_first_one_one_main2 {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
              text-align: center;
              width: 100%;
      
          }
      
          .main_page4_first_one_one_main_numone_num {
              font-size: 50px;
              font-weight: bolder;
          }
      
          .main_page4_first_one_one_main_numone_txt {
              font-size: 12px;
              font-weight: bold;
              margin-top: 4px;
          }
      
          .main_page4_first_one2 {
              justify-content: space-between !important;
              /* width: 100% !important; */
              width: 90%;
          }
      
          .main_page4_first_one2 .main_page4_first_one_one {
              width: 45%;
          }
      
      
      
      
      
      
      
      
          .main_page4_first_one_one_main_one_border {
              border-right: 1.8px dashed black;
              margin-right: 5px;
          }
      
          .main_third_line_new {
              width: 95% !important;
              margin-top: 5px;
          }
      
      
      
      
      
          #main_page5_first_one_chart19,
          #main_page5_first_one_chart20 {
              width: 400px;
          }
      
      
      
      
      
          .main_page5_first {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 95%;
          }
      
          .main_page5_first_one {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              text-align: center;
              width: 100%;
          }
      
          .main_page5_first_one_one {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 40%;
          }
      
          .main_page5_first_one_one_num {
              font-size: 28px;
              font-weight: bolder;
              background-color: white;
              padding: 1px 7px;
              border-radius: 19px;
          }
      
          .main_page5_first_one_one_txt {
              font-size: 17px;
              font-weight: bold;
              text-decoration: underline;
              letter-spacing: 0.3cap;
              margin-top: 10px;
          }
      
          .main_page5_first_one_two {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
          }
      
          .main_page5_first_one_one_chart canvas {
              max-width: 100px;
              height: 100px;
              width: 100%;
          }
      
          .main_page5_first_one:nth-child(2) {
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
          }
      
          .main_page5_first_one_txt {
              font-size: 20px;
              font-weight: bolder;
              text-decoration: underline;
              letter-spacing: 0.3cap;
              margin-top: 20px;
              margin-bottom: 20px;
          }
      
          .main_page5_first_one_chart canvas {
              margin-top: 30px;
          }
      
      
      
      
      
      
          .main_page5_first_one_one2 {
              width: 65%;
          }
      
          .main_page5_first_one_one2 canvas {
              width: 500px;
          }
      
          .main_page5_first_one_one3 {
              width: 45%;
          }
      
          .main_page5_first_one_one4 {
              width: 30% !important;
          }
      
          #main_page5_first_one_chart17 {
              width: 400px;
          }
      
          .main_page5_first_one_chart {
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
      
          .main_page5_first_one_chart_other {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 80px;
              padding: 10px 25px;
              border-radius: 35px;
              background-color: #FFDE59;
              font-size: 28px;
              font-weight: bold;
              text-align: center;
          }
      
          #main_page5_first_one_chart18 {
              width: 300px;
              max-width: 500px;
          }
      
      
      
      
      
      
          .main_page6_first {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
          }
      
          .main_page6_first_one {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
          }
      
          .main_page6_first_one_head {
              font-size: 24px;
              font-weight: bolder;
              text-decoration: underline;
              letter-spacing: 0.3cap;
              margin-bottom: 30px;
              margin-top: 20px;
      
          }
      
          .main_page6_first_one_charts {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-start;
              width: 90%;
          }
      
          .main_page6_first_one_charts_one canvas {
              width: 500px;
          }
      
          .main_page6_first_one_charts_two {
              margin-left: 5px;
          }
      
          .main_page6_first_one_charts_two canvas {
              width: 400px;
              margin-left: 5px;
          }
      
      
      
      
      
          .main_page6_first_one_flex {
              display: flex;
              flex-direction: row;
              width: 100%;
              justify-content: space-around;
              align-items: flex-start;
              text-align: center;
          }
      
          .main_page6_first_one_charts_three canvas {
              width: 400px;
          }
      
          .main_float_line2 {
              top: 130px !important;
              height: 1300px !important;
          }
      
          .main_float_line3 {
              height: 1150px !important;
              top: 715% !important;
              z-index: 0;
              left: 53%;
          }
      
          .main_page4_first_one_one_main_pluse_growth {
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
      </style>
      
      <body>
          <!-- Main ELEMENT FOR COMPLETE PDF -->
          <div class="main">
              <div class="main_first">
                  <div class="main_first_img">
                  <img src="https://i.ibb.co/WxYF57b/logo-1.png" alt="">
                  </div>
                  <div class="main_first_text">
                      <div class="main_first_text_tex1">
                          NEW BRUNSWICK
                      </div>
                      <div class="main_first_text_tex2">
                          KEY INSIGHTS
                      </div>
                  </div>
              </div>
              <div class="main_second">
              <div class="main_second1">
                  <div class="main_second_select1">
                      <label class="label" for="cars">PROVINCE:</label>
                      <select name="cars" id="cars" style="width:150px">
                          <option value="volvo">New Brunswick</option>
                      </select>
                  </div>
                  <div class="main_second_select1">
                      <label class="label" for="cars" style="margin-right: 25px;">INCOME:</label>
                      <select name="cars" id="cars" style="width:150px">
                          <option value="volvo">Moncton</option>
                      </select>
                  </div>
              </div>
              <div class="main_second1">
                  <div class="main_second_select1">
                      <label class="label" for="cars" style="margin-left: 10px;">YEAR:</label>
                      <select name="cars" id="cars"  style="width:150px;margin-left: 28px;">
                          <option value="volvo">2022</option>
                      </select>
                  </div>
                  <div class="main_second_select1">
                      <label class="label" for="cars">TYPE OF<br>
                          HOUSE:</label>
                      <select name="cars" id="cars"  style="width:150px;height: 50px;">
                          <option value="volvo">Apartment & Row
                          </option>
                      </select>
                  </div>
              </div>
              <div class="main_second2">
                  <div class="main_second_select1">
                      <div class="main_second_select1_label label">
                          AFFORDABILITY<br /> DEFINITION :
                      </div>
                      <select name="cars" id="cars" style="width:150px;">
                          <option value="volvo">USE BOTH</option>
                      </select>
  
                  </div>
                  <div class="main_second_select1">
                      <div class="main_second_select1_label label small_label">
                          SOURCE FOR COST OF NON<br>
                          SHELTER NECESSITIES: :
                      </div>
                      <div class="main_second_select1_check ">
                          <select name="cars" id="cars" style="width:150px;">
                              <option value="volvo">Poverty Line Expense</option>
                          </select>
  
                      </div>
                  </div>
                  <div class="main_second_select1">
                      <div class="main_second_select1_label label">
                          RENT SOURCE :
                      </div>
                      <select name="cars" id="cars" style="margin-left: 20px;width:150px;">
                          <option value="volvo">CMHC</option>
                      </select>
  
                  </div>
              </div>
          </div>
              <div class="main_third">
                  <div class="main_third_text">
                      <span>
                          NOTE - B = Bedrooms
                      </span>
                      <span>
                      </span>
                  </div>
                  <div class="main_third_line">
      
                  </div>
              </div>
              <div class="main_page3_first">
                  <div class="main_page3_first_one">
                      <div class="main_page3_first_one_txt">
                          AVERAGERENT
                      </div>
                      <div class="main_page3_first_one_content">
                          <div class="main_page3_first_one_content_one">
                              <div class="main_page3_first_one_content_one_head">
                                  ROW HOUSE
                              </div>
                              <div class="main_page3_first_one_content_one_buttons">
                                  <div class="main_page3_first_one_content_one_buttons_button">
                                      <span>0B</span> $900
                                  </div>
                                  <div class="main_page3_first_one_content_one_buttons_button">
                                      <span>0B</span> $900
                                  </div>
                                  <div class="main_page3_first_one_content_one_buttons_button">
                                      <span>0B</span> $900
                                  </div>
                                  <div class="main_page3_first_one_content_one_buttons_button">
                                      <span>0B</span> $900
                                  </div>
                              </div>
                          </div>
                          <div class="main_page3_first_one_content_one">
                              <div class="main_page3_first_one_content_one_head">
                                  APARTMENT
                              </div>
                              <div class="main_page3_first_one_content_one_buttons">
                                  <div class="main_page3_first_one_content_one_buttons_button">
                                      <span>0B</span> $900
                                  </div>
                                  <div class="main_page3_first_one_content_one_buttons_button">
                                      <span>0B</span> $900
                                  </div>
                                  <div class="main_page3_first_one_content_one_buttons_button">
                                      <span>0B</span> $900
                                  </div>
                                  <div class="main_page3_first_one_content_one_buttons_button">
                                      <span>0B</span> $900
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="main_page3_first_one_break"></div>
                  <div class="main_page3_first_one">
                      <div class="main_page3_first_one_txt">
                          SUPPLY
                      </div>
                      <div class="main_page3_first_one_sub">
                          8% of New stock is added this Year
                      </div>
                      <div class="main_page3_first_one_chart">
                          <canvas id="main_page3_first_one_chart_main"></canvas>
                      </div>
                  </div>
                  <div class="main_page3_first_one_break"></div>
                  <div class="main_page3_first_one">
                      <div class="main_page3_first_one_txt">
                          RENTAL SHARE
                      </div>
                      <div class="main_page3_first_one_sub">
                          From Total Supply of <b> 15013</b> there are <b>>4954 are Rented</b </div>
                          <canvas id="main_page3_first_one_pichart" style="max-width:200px;"></canvas>
                      </div>
                  </div>
              </div>
              <div class="main_third_line">
              </div>
              <div class="main_page3_second">
                  <div class="main_page3_second_one">
                      <div class="main_page3_first_one_txt">
                          RANKING
                      </div>
                      <div class="main_page3_first_one_other">
                          <div class="main_page3_first_one_other_one">
                              <div class="main_page3_first_one_other_one_main">
                                  <!-- 12 -->
                              </div>
                              <div class="main_page3_first_one_other_one_text">
                                  RENTAL<br>
                                  RATIO
                              </div>
                              <div class="main_page3_first_one_other_one_sub">
                                  *Rental Units / Total Units
                              </div>
                          </div>
                          <div class="main_page3_first_one_other_one">
                              <div class="main_page3_first_one_other_one_main">
                                  <!-- 12 -->
                              </div>
                              <div class="main_page3_first_one_other_one_text">
                                  RENTAL<br>
                                  RATIO
                              </div>
                              <div class="main_page3_first_one_other_one_sub">
                                  *Rental Units / Total Units
                              </div>
                          </div>
                          <div class="main_page3_first_one_other_one">
                              <div class="main_page3_first_one_other_one_main">
                                  <!-- 12 -->
                              </div>
                              <div class="main_page3_first_one_other_one_text">
                                  RENTAL<br>
                                  RATIO
                              </div>
                              <div class="main_page3_first_one_other_one_sub">
                                  *Rental Units / Total Units
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="main_page3_first_one_break"></div>
                  <div class="main_page3_second_two">
                      <div class="main_page3_first_one_txt">
                          PERCENTAGE OF POPULATION UNDER OPTIMAL INCOME
                      </div>
                      <canvas id="main_page3_first_one_chart3"></canvas>
                  </div>
              </div>
              <div class="main_third_line">
              </div>
              <div class="main_page3_third">
                  <div class="main_page3_third_one">
                      <div class="main_page3_first_one_txt">
                          OPTIMALINCOME INCOME
                      </div>
                      <div class="main_page3_first_one_sub2">
                          MINIMUM IN COME NEEDED TO AFFORD
                          FOLLOWING TYPE OF HOUSES
                      </div>
                      <div class="main_page3_first_one_main">
                          <div class="main_page3_first_one_main_head">
                              <div class="main_page3_first_one_main_head_head">
                                  ROW HOUSE
                              </div>
                              <div class="main_page3_first_one_main_head_head">
                                  APARTMENT
                              </div>
                          </div>
                          <div class="main_page3_first_one_main_head_sub">
                              <div class="main_page3_first_one_main_head_sub_one">
                                  0 B
                              </div>
                              <div class="main_page3_first_one_main_head_sub_two">
                                  $41,000
                              </div>
                              <div class="main_page3_first_one_main_head_sub_two">
                                  $40,000
                              </div>
                          </div>
                          <div class="main_page3_first_one_main_head_sub">
                              <div class="main_page3_first_one_main_head_sub_one">
                                  1 B
                              </div>
                              <div class="main_page3_first_one_main_head_sub_two">
                                  $41,000
                              </div>
                              <div class="main_page3_first_one_main_head_sub_two">
                                  $40,000
                              </div>
                          </div>
                          <div class="main_page3_first_one_main_head_sub">
                              <div class="main_page3_first_one_main_head_sub_one">
                                  2 B
                              </div>
                              <div class="main_page3_first_one_main_head_sub_two">
                                  $41,000
                              </div>
                              <div class="main_page3_first_one_main_head_sub_two">
                                  $40,000
                              </div>
                          </div>
                          <div class="main_page3_first_one_main_head_sub">
                              <div class="main_page3_first_one_main_head_sub_one">
                                  3B+
                              </div>
                              <div class="main_page3_first_one_main_head_sub_two">
                                  $41,000
                              </div>
                              <div class="main_page3_first_one_main_head_sub_two">
                                  $40,000
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="main_page3_first_one_break"></div>
      
                  <div class="main_page3_third_one">
                      <div class="main_page3_first_one_txt">
                          RENTAL AFFORDABLE STOCK OVERVIEW
                      </div>
                      <div class="main_page3_first_one_one">
                          <div class="main_page3_first_one_one_one">
                              <div class="main_page3_first_one_one_num">
                                  5,010
                              </div>
                              <div class="main_page3_first_one_one_txt">
                                  AFFORDABLE<br>
                                  STOCK
                              </div>
                          </div>
                          <div class="main_page3_first_one_one_one">
                              <div class="main_page3_first_one_one_num">
                                  2,500
                              </div>
                              <div class="main_page3_first_one_one_txt">
                                  UNAFFORDABLE<br>
                                  STOCK
                              </div>
                          </div>
                      </div>
                      <div class="main_page3_first_one_two">
                          <table>
                              <tr>
                                  <th>NUMBER OF
                                      HOUSES
                                  </th>
                                  <th>30%
                                      BENCHMARK</th>
                                  <th>RESIDUAL
                                      INCOME</th>
                              </tr>
                              <tr>
                                  <td>AVAILIABLE</td>
                                  <td class="bigtd">500</td>
                                  <td class="bigtd">375</td>
                              </tr>
                              <tr>
                                  <td>CONSTRUCTED</td>
                                  <td class="bigtd">250</td>
                                  <td class="bigtd">198</td>
                              </tr>
      
                          </table>
                      </div>
                  </div>
      
              </div>
              <div class="main_third_line">
              </div>
              <div class="main_page3_four">
                  <div class="main_page3_four_one">
                      <div class="main_page3_first_one_txt">
                          AFFORDABLE RENT
                      </div>
                      <div class="main_page3_first_one_txt_chart">
                          <canvas id="main_page3_first_one_txt_chart_main"></canvas>
                      </div>
                  </div>
                  <div class="main_page3_first_one_break"></div>
      
                  <div class="main_page3_four_one">
                      <div class="main_page3_first_one_txt">
                          AFFORDABLE RENT
                      </div>
                      <div class="main_page3_first_one_tri">
                          <div id="chartDiv" style="width: 400px;height: 250px;background:transparent !important;">
                          </div>
                      </div>
                  </div>
              </div>
      
              <!-- SIXTH PAGE -->
              <br><br>
              <div style="position: relative;">
                  <div class="main_first">
                      <div class="main_first_img">
                      <img src="https://i.ibb.co/WxYF57b/logo-1.png" alt="">
                      </div>
                      <div class="main_first_text">
                          <div class="main_first_text_tex1">
                              NEW BRUNSWICK - MONCTON
                          </div>
                          <div class="main_first_text_tex2">
                              SUPPLY ANALYSIS
                          </div>
                      </div>
                  </div>
                  <div class="main_third">
                      <div class="main_third_text">
                          <span>
                              NOTE - B = Bedrooms
                          </span>
      
                      </div>
                      <div class="main_third_line">
                      </div>
                  </div>
                  <div class="main_page4_first">
                      <div class="main_page4_first_one">
                          <div class="main_page4_first_one_one">
                              <div class="main_page4_first_one_one_head">
                                  APARTMENT OVERVIEW
                              </div>
                              <div class="main_page4_first_one_one_main">
                                  <div class="main_page4_first_one_one_main_one main_page4_first_one_one_main_one_border">
                                      <div class="main_page4_first_one_one_main_one_head">
                                          TOTAL UNITS
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_sub">
                                          10,010
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart">
                                          <canvas id="main_page4_first_one_one_main_one_chart8"></canvas>
                                      </div>
                                  </div>
                                  <div class="main_page4_first_one_one_main_one">
                                      <div class="main_page4_first_one_one_main_one_head">
                                          TYPE OF BEDROOM
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart">
                                          <canvas id="main_page4_first_one_one_main_one_chart9"></canvas>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="main_page4_first_one_one">
                              <div class="main_page4_first_one_one_head">
                                  ROW HOUSE OVERVIEW
                              </div>
                              <div class="main_page4_first_one_one_main">
                                  <div class="main_page4_first_one_one_main_one main_page4_first_one_one_main_one_border">
                                      <div class="main_page4_first_one_one_main_one_head">
                                          TOTAL UNITS
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_sub">
                                          10,010
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart">
                                          <canvas id="main_page4_first_one_one_main_one_chart10"></canvas>
                                      </div>
                                  </div>
                                  <div class="main_page4_first_one_one_main_one">
                                      <div class="main_page4_first_one_one_main_one_head">
                                          TYPE OF BEDROOM
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart">
                                          <canvas id="main_page4_first_one_one_main_one_chart11"></canvas>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="main_third_line main_third_line_new">
                      </div>
                      <div class="main_page4_first_one">
                          <div class="main_page4_first_one_one">
                              <div class="main_page4_first_one_one_main_one_head">
                                  HISTORICAL STOCK
                              </div>
                              <div class="main_page4_first_one_one_main main_page4_first_one_one_main_pluse_growth">
                                  <div class="main_page4_first_one_one_main_one">
                                      <div class="main_page4_first_one_one_main_one_chart">
                                          <canvas id="main_page4_first_one_one_main_one_chart12"></canvas>
                                      </div>
                                  </div>
                                  <div class="main_page4_first_one_one_main_one_chart_bar_other">
                                      <div class="main_page4_first_one_one_main_one_chart_bar_other_head">
                                          GROWTH RATE
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart_bar_other_rate">
                                          <span class="main_page4_first_one_one_main_one_chart_bar_other_rate_num">1.5%
                                              <img width="20" height="16"
                                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB3UlEQVQ4jWP4//8/Az584P4Be4keiWeCHYJvD9w/YEdIPeP///8ZcIEvv75w607XvfzgwwNFBgYGBmVB5TuXMi/pcbFyfcelhwmnaQwMDLX7apthhjEwMDDcfX9XpfFgYz0+PThdeOrpKTPLuZbH/v3/x4wszsLE8udUyilTQ0nDC0S78Pff36wpm1JmoxvGwMDA8OffH5bUzalz/vz7gyGH08Cuo11ll19d1sPqdAYGhrPPzxpPODGhAJschpdvvLmhbjDD4MLPvz85cBnIwMDAwMXK9fVy5mVdJUGl+zhd+O//P8a0zWmzCBnGwMDA8O33N+6MLRkz0B2EYuCss7PSDj86bEfIMBjYfW+326KLi+KQxeBefvrpqZTWNK1rn35+4ifWQAYGBgZhTuE317KvaYlxi71GcWH2tuyppBrGwMDA8Pb7W5GCHQUTYHwmBgYGhtVXV4dsvLkxgFTDYGD5leVR229v92RgYGBgfPftnYDWNK3rL768kCDXQAYGBgZ5fvmHV7KuaDO/NXs7+dCjQ0RHBC7w8edHgW+/v3ExinSJvHrz7Y0opQYyMDAwiHGLvWSK0Y1ZysLI8oeNme0XGzPbL1YmVhj+jYxZmFiw4T8wzMrE+ivXLHcyAOYX+EkJeBCMAAAAAElFTkSuQmCC"></span><br>
                                          <span
                                              class="main_page4_first_one_one_main_one_chart_bar_other_rate_who">OWNED</span>
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart_bar_other_rate">
                                          <span class="main_page4_first_one_one_main_one_chart_bar_other_rate_num">-1%
                                              <img width="20" height="16"
                                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABpUlEQVQ4jWP8Nn999c/5G+oY/jMwMiADVB4DAwPDf1R5RlTxf/+Z2IJdpjB+8M56+f/9JzEM7WQARgHe10ysrpbLqGEYAwMDA6ut0UbGf1+/83yKqbjy/+VbeYpcJ8T/nHdZpxYTIxfHF67ShExKXcdZFJfLxMv9gYmBgYGB1dJgOyVeZ7E12sDmaLaWgYGBgfH/f2gkvf8k+jmq/Pr/T1+ESTKNm/Mj39JOLSZRwWcMDAwMTDBxJkG+1xy5UUWkuo4zK6IcZhiKgQwMDAxsnjaLWEy0dxNrGLO++iE2f8dZyGIoBjIyMjJwliVlMHCwfSVoGhvrD67ypDRGRkaUBM+Ero5ZWuweR3JQAyHzOBL8m5nlpW6ii2MYyMDAwMAe7tHPrKZwFpdhTMqyl9ijvbuxymETZGRm/stZkZzKwMz0B1MH41+uiuQURhaW30QbyMDAwMCirnCePcKzD12cLdRtEouW8mlc+uDpEBv4/+Mn5+e4qkv/nr5SYWBgYGCUFLnPt7hdl5GTA3ek/f//Hy/+de6a3Xv3tHcffLOf/Tp7zZ6QegDtJaSx3DtD8QAAAABJRU5ErkJgggAA"></span><br>
                                          <span
                                              class="main_page4_first_one_one_main_one_chart_bar_other_rate_who">OWNED</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="main_page4_first_one_one">
                              <div class="main_page4_first_one_one_main_one_head">
                                  HISTORICAL STOCK
                              </div>
                              <div class="main_page4_first_one_one_main main_page4_first_one_one_main_pluse_growth">
                                  <div class="main_page4_first_one_one_main_one">
                                      <div class="main_page4_first_one_one_main_one_chart">
                                          <canvas id="main_page4_first_one_one_main_one_chart13"></canvas>
                                      </div>
                                  </div>
                                  <div class="main_page4_first_one_one_main_one_chart_bar_other">
                                      <div class="main_page4_first_one_one_main_one_chart_bar_other_head">
                                          GROWTH RATE
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart_bar_other_rate">
                                          <span class="main_page4_first_one_one_main_one_chart_bar_other_rate_num">1.5%
                                              <img width="20" height="16"
                                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB3UlEQVQ4jWP4//8/Az584P4Be4keiWeCHYJvD9w/YEdIPeP///8ZcIEvv75w607XvfzgwwNFBgYGBmVB5TuXMi/pcbFyfcelhwmnaQwMDLX7apthhjEwMDDcfX9XpfFgYz0+PThdeOrpKTPLuZbH/v3/x4wszsLE8udUyilTQ0nDC0S78Pff36wpm1JmoxvGwMDA8OffH5bUzalz/vz7gyGH08Cuo11ll19d1sPqdAYGhrPPzxpPODGhAJschpdvvLmhbjDD4MLPvz85cBnIwMDAwMXK9fVy5mVdJUGl+zhd+O//P8a0zWmzCBnGwMDA8O33N+6MLRkz0B2EYuCss7PSDj86bEfIMBjYfW+326KLi+KQxeBefvrpqZTWNK1rn35+4ifWQAYGBgZhTuE317KvaYlxi71GcWH2tuyppBrGwMDA8Pb7W5GCHQUTYHwmBgYGhtVXV4dsvLkxgFTDYGD5leVR229v92RgYGBgfPftnYDWNK3rL768kCDXQAYGBgZ5fvmHV7KuaDO/NXs7+dCjQ0RHBC7w8edHgW+/v3ExinSJvHrz7Y0opQYyMDAwiHGLvWSK0Y1ZysLI8oeNme0XGzPbL1YmVhj+jYxZmFiw4T8wzMrE+ivXLHcyAOYX+EkJeBCMAAAAAElFTkSuQmCC"></span><br>
                                          <span
                                              class="main_page4_first_one_one_main_one_chart_bar_other_rate_who">OWNED</span>
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart_bar_other_rate">
                                          <span class="main_page4_first_one_one_main_one_chart_bar_other_rate_num">-1%
                                              <img width="20" height="16"
                                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABpUlEQVQ4jWP8Nn999c/5G+oY/jMwMiADVB4DAwPDf1R5RlTxf/+Z2IJdpjB+8M56+f/9JzEM7WQARgHe10ysrpbLqGEYAwMDA6ut0UbGf1+/83yKqbjy/+VbeYpcJ8T/nHdZpxYTIxfHF67ShExKXcdZFJfLxMv9gYmBgYGB1dJgOyVeZ7E12sDmaLaWgYGBgfH/f2gkvf8k+jmq/Pr/T1+ESTKNm/Mj39JOLSZRwWcMDAwMTDBxJkG+1xy5UUWkuo4zK6IcZhiKgQwMDAxsnjaLWEy0dxNrGLO++iE2f8dZyGIoBjIyMjJwliVlMHCwfSVoGhvrD67ypDRGRkaUBM+Ero5ZWuweR3JQAyHzOBL8m5nlpW6ii2MYyMDAwMAe7tHPrKZwFpdhTMqyl9ijvbuxymETZGRm/stZkZzKwMz0B1MH41+uiuQURhaW30QbyMDAwMCirnCePcKzD12cLdRtEouW8mlc+uDpEBv4/+Mn5+e4qkv/nr5SYWBgYGCUFLnPt7hdl5GTA3ek/f//Hy/+de6a3Xv3tHcffLOf/Tp7zZ6QegDtJaSx3DtD8QAAAABJRU5ErkJgggAA"></span><br>
                                          <span
                                              class="main_page4_first_one_one_main_one_chart_bar_other_rate_who">OWNED</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="main_third_line main_third_line_new">
                      </div>
                      <div class="main_page4_first_one">
                          <div class="main_page4_first_one_one">
      
                              <div class="main_page4_first_one_one_main">
                                  <div class="main_page4_first_one_one_main_one main_page4_first_one_one_main_one_border">
                                      <div class="main_page4_first_one_one_main_one_head">
                                          NEW UNITS ADDED
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_sub">
                                          670
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart">
                                          <div class="main_page4_first_one_one_main_one_chart_bar">
                                              <div class="main_page4_first_one_one_main_one_chart_bar_big">
                                                  6.0% <br> OWNED
                                              </div>
                                              <div class="main_page4_first_one_one_main_one_chart_bar_small">
                                                  RENTAL
                                              </div>
      
                                          </div>
                                          <div class="main_page4_first_one_one_main_one_chart_bar_other">
                                              <div class="main_page4_first_one_one_main_one_chart_bar_other_head">
                                                  GROWTH RATE
                                              </div>
                                              <div class="main_page4_first_one_one_main_one_chart_bar_other_rate">
                                                  <span
                                                      class="main_page4_first_one_one_main_one_chart_bar_other_rate_num">1.5%
                                                      <img width="20" height="16"
                                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB3UlEQVQ4jWP4//8/Az584P4Be4keiWeCHYJvD9w/YEdIPeP///8ZcIEvv75w607XvfzgwwNFBgYGBmVB5TuXMi/pcbFyfcelhwmnaQwMDLX7apthhjEwMDDcfX9XpfFgYz0+PThdeOrpKTPLuZbH/v3/x4wszsLE8udUyilTQ0nDC0S78Pff36wpm1JmoxvGwMDA8OffH5bUzalz/vz7gyGH08Cuo11ll19d1sPqdAYGhrPPzxpPODGhAJschpdvvLmhbjDD4MLPvz85cBnIwMDAwMXK9fVy5mVdJUGl+zhd+O//P8a0zWmzCBnGwMDA8O33N+6MLRkz0B2EYuCss7PSDj86bEfIMBjYfW+326KLi+KQxeBefvrpqZTWNK1rn35+4ifWQAYGBgZhTuE317KvaYlxi71GcWH2tuyppBrGwMDA8Pb7W5GCHQUTYHwmBgYGhtVXV4dsvLkxgFTDYGD5leVR229v92RgYGBgfPftnYDWNK3rL768kCDXQAYGBgZ5fvmHV7KuaDO/NXs7+dCjQ0RHBC7w8edHgW+/v3ExinSJvHrz7Y0opQYyMDAwiHGLvWSK0Y1ZysLI8oeNme0XGzPbL1YmVhj+jYxZmFiw4T8wzMrE+ivXLHcyAOYX+EkJeBCMAAAAAElFTkSuQmCC"></span><br>
                                                  <span
                                                      class="main_page4_first_one_one_main_one_chart_bar_other_rate_who">OWNED</span>
                                              </div>
                                              <div class="main_page4_first_one_one_main_one_chart_bar_other_rate">
                                                  <span class="main_page4_first_one_one_main_one_chart_bar_other_rate_num">-1%
                                                      <img width="20" height="16"
                                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABpUlEQVQ4jWP8Nn999c/5G+oY/jMwMiADVB4DAwPDf1R5RlTxf/+Z2IJdpjB+8M56+f/9JzEM7WQARgHe10ysrpbLqGEYAwMDA6ut0UbGf1+/83yKqbjy/+VbeYpcJ8T/nHdZpxYTIxfHF67ShExKXcdZFJfLxMv9gYmBgYGB1dJgOyVeZ7E12sDmaLaWgYGBgfH/f2gkvf8k+jmq/Pr/T1+ESTKNm/Mj39JOLSZRwWcMDAwMTDBxJkG+1xy5UUWkuo4zK6IcZhiKgQwMDAxsnjaLWEy0dxNrGLO++iE2f8dZyGIoBjIyMjJwliVlMHCwfSVoGhvrD67ypDRGRkaUBM+Ero5ZWuweR3JQAyHzOBL8m5nlpW6ii2MYyMDAwMAe7tHPrKZwFpdhTMqyl9ijvbuxymETZGRm/stZkZzKwMz0B1MH41+uiuQURhaW30QbyMDAwMCirnCePcKzD12cLdRtEouW8mlc+uDpEBv4/+Mn5+e4qkv/nr5SYWBgYGCUFLnPt7hdl5GTA3ek/f//Hy/+de6a3Xv3tHcffLOf/Tp7zZ6QegDtJaSx3DtD8QAAAABJRU5ErkJgggAA"></span><br>
                                                  <span
                                                      class="main_page4_first_one_one_main_one_chart_bar_other_rate_who">OWNED</span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="main_page4_first_one_one_main_one">
                                      <div class="main_page4_first_one_one_main_one_head">
                                          TYPE OF BEDROOM
                                      </div>
                                      <div class="main_page4_first_one_one_main_one_chart">
                                          <canvas id="main_page4_first_one_one_main_one_chart14"></canvas>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="main_page4_first_one_one">
      
                              <div class="main_page4_first_one_one_main">
                                  <div class="main_page4_first_one_one_main">
                                      <div class="main_page4_first_one_one_main_one main_page4_first_one_one_main_one_border">
                                          <div class="main_page4_first_one_one_main_one_head">
                                              NEW UNITS ADDED
                                          </div>
                                          <div class="main_page4_first_one_one_main_one_sub">
                                              670
                                          </div>
                                          <div class="main_page4_first_one_one_main_one_chart">
                                              <div class="main_page4_first_one_one_main_one_chart_bar">
                                                  <div class="main_page4_first_one_one_main_one_chart_bar_big">
                                                      6.0% <br> OWNED
                                                  </div>
                                                  <div class="main_page4_first_one_one_main_one_chart_bar_small">
                                                      RENTAL
                                                  </div>
      
                                              </div>
                                              <div class="main_page4_first_one_one_main_one_chart_bar_other">
                                                  <div class="main_page4_first_one_one_main_one_chart_bar_other_head">
                                                      GROWTH RATE
                                                  </div>
                                                  <div class="main_page4_first_one_one_main_one_chart_bar_other_rate">
                                                      <span
                                                          class="main_page4_first_one_one_main_one_chart_bar_other_rate_num">1.5%
                                                          <img width="20" height="16"
                                                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB3UlEQVQ4jWP4//8/Az584P4Be4keiWeCHYJvD9w/YEdIPeP///8ZcIEvv75w607XvfzgwwNFBgYGBmVB5TuXMi/pcbFyfcelhwmnaQwMDLX7apthhjEwMDDcfX9XpfFgYz0+PThdeOrpKTPLuZbH/v3/x4wszsLE8udUyilTQ0nDC0S78Pff36wpm1JmoxvGwMDA8OffH5bUzalz/vz7gyGH08Cuo11ll19d1sPqdAYGhrPPzxpPODGhAJschpdvvLmhbjDD4MLPvz85cBnIwMDAwMXK9fVy5mVdJUGl+zhd+O//P8a0zWmzCBnGwMDA8O33N+6MLRkz0B2EYuCss7PSDj86bEfIMBjYfW+326KLi+KQxeBefvrpqZTWNK1rn35+4ifWQAYGBgZhTuE317KvaYlxi71GcWH2tuyppBrGwMDA8Pb7W5GCHQUTYHwmBgYGhtVXV4dsvLkxgFTDYGD5leVR229v92RgYGBgfPftnYDWNK3rL768kCDXQAYGBgZ5fvmHV7KuaDO/NXs7+dCjQ0RHBC7w8edHgW+/v3ExinSJvHrz7Y0opQYyMDAwiHGLvWSK0Y1ZysLI8oeNme0XGzPbL1YmVhj+jYxZmFiw4T8wzMrE+ivXLHcyAOYX+EkJeBCMAAAAAElFTkSuQmCC"></span><br>
                                                      <span
                                                          class="main_page4_first_one_one_main_one_chart_bar_other_rate_who">OWNED</span>
                                                  </div>
                                                  <div class="main_page4_first_one_one_main_one_chart_bar_other_rate">
                                                      <span
                                                          class="main_page4_first_one_one_main_one_chart_bar_other_rate_num">-1%
                                                          <img width="20" height="16"
                                                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABpUlEQVQ4jWP8Nn999c/5G+oY/jMwMiADVB4DAwPDf1R5RlTxf/+Z2IJdpjB+8M56+f/9JzEM7WQARgHe10ysrpbLqGEYAwMDA6ut0UbGf1+/83yKqbjy/+VbeYpcJ8T/nHdZpxYTIxfHF67ShExKXcdZFJfLxMv9gYmBgYGB1dJgOyVeZ7E12sDmaLaWgYGBgfH/f2gkvf8k+jmq/Pr/T1+ESTKNm/Mj39JOLSZRwWcMDAwMTDBxJkG+1xy5UUWkuo4zK6IcZhiKgQwMDAxsnjaLWEy0dxNrGLO++iE2f8dZyGIoBjIyMjJwliVlMHCwfSVoGhvrD67ypDRGRkaUBM+Ero5ZWuweR3JQAyHzOBL8m5nlpW6ii2MYyMDAwMAe7tHPrKZwFpdhTMqyl9ijvbuxymETZGRm/stZkZzKwMz0B1MH41+uiuQURhaW30QbyMDAwMCirnCePcKzD12cLdRtEouW8mlc+uDpEBv4/+Mn5+e4qkv/nr5SYWBgYGCUFLnPt7hdl5GTA3ek/f//Hy/+de6a3Xv3tHcffLOf/Tp7zZ6QegDtJaSx3DtD8QAAAABJRU5ErkJgggAA"></span><br>
                                                      <span
                                                          class="main_page4_first_one_one_main_one_chart_bar_other_rate_who">OWNED</span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="main_page4_first_one_one_main_one">
                                          <div class="main_page4_first_one_one_main_one_head">
                                              TYPE OF BEDROOM
                                          </div>
                                          <div class="main_page4_first_one_one_main_one_chart">
                                              <canvas id="main_page4_first_one_one_main_one_chart15"></canvas>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="main_third_line main_third_line_new">
                      </div>
                      <div class="main_page4_first_one">
                          <div class="main_page3_third_one">
                              <div class="main_page3_first_one_txt">
                                  RENTAL AFFORDABLE UNITS
                              </div>
                              <div class="main_page3_first_one_one">
                                  <div class="main_page3_first_one_one_one">
                                      <div class="main_page3_first_one_one_num">
                                          5,010
                                      </div>
                                      <div class="main_page3_first_one_one_txt">
                                          AFFORDABLE
                                      </div>
                                  </div>
                                  <div class="main_page3_first_one_one_one">
                                      <div class="main_page3_first_one_one_num">
                                          2,500
                                      </div>
                                      <div class="main_page3_first_one_one_txt">
                                          UNAFFORDABLE
                                      </div>
                                  </div>
                              </div>
                              <div class="main_page3_first_one_two">
                                  <table>
                                      <tr>
                                          <th>NUMBER OF
                                              HOUSES
                                          </th>
                                          <th>30%
                                              BENCHMARK</th>
                                          <th>RESIDUAL
                                              INCOME</th>
                                      </tr>
                                      <tr>
                                          <td>AVAILIABLE</td>
                                          <td class="bigtd">500</td>
                                          <td class="bigtd">375</td>
                                      </tr>
                                      <tr>
                                          <td>CONSTRUCTED</td>
                                          <td class="bigtd">250</td>
                                          <td class="bigtd">198</td>
                                      </tr>
      
                                  </table>
                              </div>
                          </div>
                          <div class="main_page3_third_one">
                              <div class="main_page3_first_one_txt">
                                  RENTAL AFFORDABLE UNITS
                              </div>
                              <div class="main_page3_first_one_one">
                                  <div class="main_page3_first_one_one_one">
                                      <div class="main_page3_first_one_one_num">
                                          5,010
                                      </div>
                                      <div class="main_page3_first_one_one_txt">
                                          AFFORDABLE
                                      </div>
                                  </div>
                                  <div class="main_page3_first_one_one_one">
                                      <div class="main_page3_first_one_one_num">
                                          2,500
                                      </div>
                                      <div class="main_page3_first_one_one_txt">
                                          UNAFFORDABLE
                                      </div>
                                  </div>
                              </div>
                              <div class="main_page3_first_one_two">
                                  <table>
                                      <tr>
                                          <th>NUMBER OF
                                              HOUSES
                                          </th>
                                          <th>30%
                                              BENCHMARK</th>
                                          <th>RESIDUAL
                                              INCOME</th>
                                      </tr>
                                      <tr>
                                          <td>AVAILIABLE</td>
                                          <td class="bigtd">500</td>
                                          <td class="bigtd">375</td>
                                      </tr>
                                      <tr>
                                          <td>CONSTRUCTED</td>
                                          <td class="bigtd">250</td>
                                          <td class="bigtd">198</td>
                                      </tr>
      
                                  </table>
                              </div>
                          </div>
                      </div>
                      <div class="main_third_line main_third_line_new">
                      </div>
                      <div class="main_page4_first_one main_page4_first_one2">
                          <div class="main_page4_first_one_one">
                              <div class="main_page4_first_one_one_main_one_head">
                                  UNAFFORDABLE
                              </div>
                              <div class="main_page4_first_one_one_main2">
                                  <div class="main_page4_first_one_one_main_numone">
                                      <div class="main_page4_first_one_one_main_numone_num">
                                          1,050
                                      </div>
                                      <div class="main_page4_first_one_one_main_numone_txt">
                                          TOTAL
                                      </div>
                                  </div>
                                  <div class="main_page4_first_one_one_main_numone">
                                      <div class="main_page4_first_one_one_main_numone_num">
                                          300
                                      </div>
                                      <div class="main_page4_first_one_one_main_numone_txt">
                                          RANTED
                                      </div>
                                  </div>
                                  <div class="main_page4_first_one_one_main_numone">
                                      <div class="main_page4_first_one_one_main_numone_num">
                                          7,050
                                      </div>
                                      <div class="main_page4_first_one_one_main_numone_txt">
                                          OWNED
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="main_page4_first_one_one">
                              <div class="main_page4_first_one_one_main_one_head">
                                  UNAFFORDABLE
                              </div>
                              <div class="main_page4_first_one_one_main2">
                                  <div class="main_page4_first_one_one_main_numone">
                                      <div class="main_page4_first_one_one_main_numone_num">
                                          1,050
                                      </div>
                                      <div class="main_page4_first_one_one_main_numone_txt">
                                          TOTAL
                                      </div>
                                  </div>
                                  <div class="main_page4_first_one_one_main_numone">
                                      <div class="main_page4_first_one_one_main_numone_num">
                                          300
                                      </div>
                                      <div class="main_page4_first_one_one_main_numone_txt">
                                          RANTED
                                      </div>
                                  </div>
                                  <div class="main_page4_first_one_one_main_numone">
                                      <div class="main_page4_first_one_one_main_numone_num">
                                          7,050
                                      </div>
                                      <div class="main_page4_first_one_one_main_numone_txt">
                                          OWNED
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
      
                  </div>
                  <div class="main_float_line main_float_line2">
      
                  </div>
              </div>
      
      
      
      
      
      
      
              <br><br>
              <!-- SEVENTH PAGE -->
              <div class="main_first">
                  <div class="main_first_img">
                  <img src="https://i.ibb.co/WxYF57b/logo-1.png" alt="">
                  </div>
                  <div class="main_first_text">
                      <div class="main_first_text_tex1">
                          NEW BRUNSWICK - MONCTON
                      </div>
                      <div class="main_first_text_tex2">
                          INCOME ANALYSIS
                      </div>
                  </div>
              </div>
              <div class="main_third">
                  <div class="main_third_text">
                      <span>
                          INCOME IS TAKEN ANUALLY
                      </span>
      
                  </div>
                  <div class="main_third_line">
                  </div>
              </div>
              <div class="main_page5_first">
                  <div class="main_page5_first_one">
                      <div class="main_page5_first_one_one main_page4_first_one_one_main_one_border">
                          <div class="main_page5_first_one_one_num">
                              $40,000
                          </div>
                          <div class="main_page5_first_one_one_txt">
                              OPTIMAL INCOME
                          </div>
                      </div>
                      <div class="main_page5_first_one_two">
                          <div class="main_page5_first_one_one_txt">
                              PERCENTAGE OF POPULATION BELOW OPTIMAL INCOME
                          </div>
                          <div class="main_page5_first_one_one_chart">
                              <canvas id="main_page5_first_one_one_chart16"></canvas>
                          </div>
                      </div>
                  </div>
                  <div class="main_page5_first_one">
                      <div class="main_page5_first_one_txt">
                          PERCENTAGE OF POPULATION IN GIVEN INCOME RANGE
                      </div>
                      <div class="main_page5_first_one_chart">
                          <canvas id="main_page5_first_one_chart17"></canvas>
                      </div>
                  </div>
                  <div class="main_page5_first_one">
                      <div
                          class="main_page5_first_one_one main_page5_first_one_one2 main_page4_first_one_one_main_one_border">
                          <div class="main_page5_first_one_txt">
                              DISCRETIONARY INCOMEAS PERCENTAGE OF MEDIAN INCOME
                          </div>
                          <div class="main_page5_first_one_chart">
                              <canvas id="main_page5_first_one_chart18"></canvas>
                              <div class="main_page5_first_one_chart_other">
                                  <div class="main_page5_first_one_chart_other_text">
                                      10%
                                  </div>
                                  <img width="20" height="42"
                                      src="data:image/png;base64,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">
                              </div>
                          </div>
                      </div>
                      <div class="main_page5_first_one_one main_page5_first_one_one4">
                          <div class="main_page5_first_one_txt">
                              MEDIAN INCOMCE RANKING
                          </div>
                          <div class="main_page3_first_one_other">
                              <div class="main_page3_first_one_other_one">
                                  <div class="main_page3_first_one_other_one_main">
                                      <!-- 12 -->
                                  </div>
                                  <div class="main_page3_first_one_other_one_text">
                                      RENTAL<br>
                                      RATIO
                                  </div>
                                  <div class="main_page3_first_one_other_one_sub">
                                      *Rental Units / Total Units
                                  </div>
                              </div>
                              <div class="main_page3_first_one_other_one">
                                  <div class="main_page3_first_one_other_one_main">
                                      <!-- 12 -->
                                  </div>
                                  <div class="main_page3_first_one_other_one_text">
                                      RENTAL<br>
                                      RATIO
                                  </div>
                                  <div class="main_page3_first_one_other_one_sub">
                                      *Rental Units / Total Units
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="main_page5_first_one">
                      <div
                          class="main_page5_first_one_one main_page5_first_one_one3 main_page4_first_one_one_main_one_border">
                          <div class="main_page5_first_one_txt">
                              MEDIAN HOUSEHOLD INCOME BEFORE TAX
                          </div>
                          <div class="main_page5_first_one_chart">
                              <canvas id="main_page5_first_one_chart19"></canvas>
                          </div>
                      </div>
                      <div class="main_page5_first_one_one main_page5_first_one_one3">
                          <div class="main_page5_first_one_txt">
                              MEDIAN HOUSEHOLD INCOME BEFORE TAX
                          </div>
                          <div class="main_page5_first_one_chart">
                              <canvas id="main_page5_first_one_chart20"></canvas>
                          </div>
                      </div>
                  </div>
              </div>
      
      
      
      
      
              <br><br>
              <!-- LAST PAGW -->
              <div class="main_first">
                  <div class="main_first_img">
                  <img src="https://i.ibb.co/WxYF57b/logo-1.png" alt="">
                  </div>
                  <div class="main_first_text">
                      <div class="main_first_text_tex1">
                          NEW BRUNSWICK - MONCTON
                      </div>
                      <div class="main_first_text_tex2">
                          SHELTER COST ANALYSIS
                      </div>
                  </div>
              </div>
              <div class="main_third">
                  <div class="main_third_text">
                      <span>
                          INCOME IS TAKEN ANUALLY
                      </span>
                  </div>
                  <div class="main_third_line">
                  </div>
              </div>
              <div class="main_page6_first">
                  <div class="main_page6_first_one">
                      <div class="main_page6_first_one_head">
                          AVERAGE RENT
                      </div>
                      <div class="main_page6_first_one_charts">
                          <div class="main_page6_first_one_charts_one">
                              <canvas id="main_page6_first_one_charts_one_21"></canvas>
                          </div>
                          <div class="main_page6_first_one_charts_two">
                              <canvas id="main_page6_first_one_charts_two_22"></canvas>
                          </div>
                      </div>
                  </div>
                  <div class="main_page6_first_one">
                      <div class="main_page6_first_one_head">
                          RENT GROWTH RATE
                      </div>
                      <div class="main_page6_first_one_charts">
                          <div class="main_page6_first_one_charts_one">
                              <canvas id="main_page6_first_one_charts_one_23"></canvas>
                          </div>
                          <div class="main_page6_first_one_charts_two">
                              <canvas id="main_page6_first_one_charts_two_24"></canvas>
                          </div>
                      </div>
                  </div>
      
      
                  <div class="main_page6_first_one">
                      <div class="main_page6_first_one_flex">
                          <div class="main_page6_first_one_head">
                              UTILITIES AS<br> PERCENTAGE OF RENT
                          </div>
                          <div class="main_page6_first_one_head">
                              AFFORDABLE RENT<br> PROVINCE WISE
                          </div>
                      </div>
                      <div class="main_page6_first_one_charts">
                          <div class="main_page6_first_one_charts_three">
                              <canvas id="main_page6_first_one_charts_one_25"></canvas>
                          </div>
                          <div class="main_page6_first_one_charts_three">
                              <canvas id="main_page6_first_one_charts_two_26"></canvas>
                          </div>
                      </div>
                  </div>
      
      
                  <!-- <div > -->
                  <div class="main_page6_first_one">
                      <div class="main_page6_first_one_flex">
                          <div class="main_page6_first_one_head">
                              TOP 5 CMAS WITH<br> HIGHEST RENT
                          </div>
                          <div class="main_page6_first_one_head">
                              TOP 5 CMAS WITH<br> LOWEST RENT
                          </div>
                      </div>
                      <div class="main_page6_first_one_charts">
                          <div class="main_page6_first_one_charts_three">
                              <canvas id="main_page6_first_one_charts_one_27"></canvas>
                          </div>
                          <div class="main_page6_first_one_charts_three">
                              <canvas id="main_page6_first_one_charts_two_28"></canvas>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </body>
      <script>
      
          const chart24 = new Chart(main_page6_first_one_charts_two_24, {
              type: 'line',
              data: {
                  labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
                  datasets: [{
                      label: 'Value',
                      data: [2, 3, 4, 1, 1, 5],
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: '#4472C4',
                      borderWidth: 2,
                  }],
              },
              options: {
                  legend: {
                      display: false,
                      position: 'top',
                  },
                  title: {
                      display: false,
                      text: 'Line Graph',
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                          },
                      }],
                  },
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'index',
                      intersect: false,
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart20 = new Chart(main_page5_first_one_chart20, {
              type: 'line',
              data: {
                  labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
                  datasets: [{
                      label: 'Value',
                      data: [60000, 61000, 70000, 71000, 90000, 100000],
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: '#00CADC',
                      borderWidth: 1,
                  },
                  {
                      label: 'Value',
                      data: [55000, 56000, 60000, 72000, 73000, 90000],
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: '#49C3FB',
                      borderWidth: 1,
                  },
                  {
                      label: 'Value',
                      data: [50000, 51000, 55000, 60000, 70000, 90000],
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: '#65A6FA',
                      borderWidth: 1,
                  },
                  ],
              },
      
              options: {
                  legend: {
                      display: false,
                      position: 'top',
                  },
                  title: {
                      display: false,
                      text: 'Line Graph',
                  },
                  scales: {
                      xAxes: [{
      
                      }],
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                          },
                      }],
                  },
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'index',
                      intersect: false,
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart19 = new Chart(main_page5_first_one_chart19, {
              type: 'line',
              data: {
                  labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
                  datasets: [{
                      label: 'Value',
                      data: [60000, 61000, 70000, 71000, 90000, 100000],
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: '#00CADC',
                      borderWidth: 1,
                  },
                  {
                      label: 'Value',
                      data: [55000, 56000, 60000, 72000, 73000, 90000],
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: '#49C3FB',
                      borderWidth: 1,
                  },
                  {
                      label: 'Value',
                      data: [50000, 51000, 55000, 60000, 70000, 90000],
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: '#65A6FA',
                      borderWidth: 1,
                  },
                  ],
              },
              options: {
                  legend: {
                      display: false,
                      position: 'top',
                  },
                  title: {
                      display: false,
                      text: 'Line Graph',
                  },
                  scales: {
                      xAxes: [{
      
                      }],
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                          },
                      }],
                  },
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'index',
                      intersect: false,
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart17 = new Chart(main_page5_first_one_chart17, {
              type: 'pie',
              data: {
                  labels: ['$60,000-79,999', '$50,000-59,999', '$40,000-49,999', '$30,000-39,000', '$20,000-29,000', '$100,000+'],
                  datasets: [{
                      data: [5.3, 10.5, 15.8, 17.9, 18.9, 10.5],
                      backgroundColor: ['#D0005F', '#BB109D', '#9B57CC', '#7E80E7', '#65A6FA', '#F79150'],
                      borderColor: '#000',
                      borderWidth: 1,
                  }],
              },
              options: {
                  legend: {
                      display: true,
                      position: 'bottom',
                  },
                  title: {
                      display: false,
                      text: 'Age Distribution',
                  },
                  plugins: {
                      datalabels: {
                          display: function (context) {
                              return context.dataset.data[context.dataIndex] > 0;
                          },
                          formatter: function (value, context) {
                              return Math.round(value * 100 / context.dataset.total) + '%';
                          },
                          color: '#000',
                          font: {
                              size: 40,
                          },
                      },
                      pieLabel: {}
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart12 = new Chart(main_page4_first_one_one_main_one_chart12, {
              type: 'line',
              data: {
                  labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
                  datasets: [{
                      label: 'Value',
                      data: [2500, 5000, 7500, 8000, 9000, 10000],
                      backgroundColor: 'transparent',
                      borderColor: '#00CADC',
                      borderWidth: 1,
                  }],
              },
              options: {
                  legend: {
                      display: true,
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Line Graph',
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                          },
                      }],
                  },
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'index',
                      intersect: false,
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart13 = new Chart(main_page4_first_one_one_main_one_chart13, {
              type: 'line',
              data: {
                  labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
                  datasets: [{
                      label: 'Value',
                      data: [2500, 5000, 7500, 8000, 9000, 10000],
                      backgroundColor: 'transparent',
                      borderColor: '#00CADC',
                      borderWidth: 1,
                  }],
              },
              options: {
                  legend: {
                      display: true,
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Line Graph',
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                          },
                      }],
                  },
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'index',
                      intersect: false,
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
      
          const chart8 = new Chart(main_page4_first_one_one_main_one_chart8, {
              type: 'pie',
              data: {
                  labels: ['RENTAL', 'OWNED'],
                  datasets: [{
                      data: [33.3, 66.7],
                      backgroundColor: ['#009299', '#003F72'],
                  }],
              },
              options: {
                  legend: {
                      display: true,
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Growth Rate',
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.value + '%';
                          },
                      },
                  },
                  borderColor: '#000',
                  borderWidth: 1,
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart10 = new Chart(main_page4_first_one_one_main_one_chart10, {
              type: 'pie',
              data: {
                  labels: ['RENTAL', 'OWNED'],
                  datasets: [{
                      data: [33.3, 66.7],
                      backgroundColor: ['#009299', '#003F72'],
                  }],
              },
              options: {
                  legend: {
                      display: true,
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Growth Rate',
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.value + '%';
                          },
                      },
                  },
                  borderColor: '#000',
                  borderWidth: 1,
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart9 = new Chart(main_page4_first_one_one_main_one_chart9, {
              type: 'pie',
              data: {
                  labels: ['0B', '3B+', '2B', '1B'],
                  datasets: [{
                      data: [1500, 2500, 3000, 3010],
                      backgroundColor: ['#00CADC', '#7E80E7', '#65A6FA', '#49C3FB'],
                  }],
              },
              options: {
                  legend: {
                      display: true,
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Growth Rate',
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.value + '%';
                          },
                      },
                  },
                  borderColor: '#000',
                  borderWidth: 1,
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart11 = new Chart(main_page4_first_one_one_main_one_chart11, {
              type: 'pie',
              data: {
                  labels: ['0B', '3B+', '2B', '1B'],
                  datasets: [{
                      data: [1500, 2500, 3000, 3010],
                      backgroundColor: ['#00CADC', '#7E80E7', '#65A6FA', '#49C3FB'],
                  }],
              },
              options: {
                  legend: {
                      display: true,
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Growth Rate',
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.value + '%';
                          },
                      },
                  },
                  borderColor: '#000',
                  borderWidth: 1,
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart14 = new Chart(main_page4_first_one_one_main_one_chart14, {
              type: 'pie',
              data: {
                  labels: ['0B', '3B+', '2B', '1B'],
                  datasets: [{
                      data: [1500, 2500, 3000, 3010],
                      backgroundColor: ['#00CADC', '#7E80E7', '#65A6FA', '#49C3FB'],
                  }],
              },
              options: {
                  legend: {
                      display: true,
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Growth Rate',
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.value + '%';
                          },
                      },
                  },
                  borderColor: '#000',
                  borderWidth: 1,
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart15 = new Chart(main_page4_first_one_one_main_one_chart15, {
              type: 'pie',
              data: {
                  labels: ['0B', '3B+', '2B', '1B'],
                  datasets: [{
                      data: [1500, 2500, 3000, 3010],
                      backgroundColor: ['#00CADC', '#7E80E7', '#65A6FA', '#49C3FB'],
                  }],
              },
      
              options: {
                  legend: {
                      display: true,
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Growth Rate',
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.value + '%';
                          },
                      },
                  },
                  borderColor: '#000',
                  borderWidth: 1,
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          var chart7 =  JSC.chart('chartDiv', {
              debug: true,
              type: 'pyramidInverted',
              legend_visible: false,
              annotations: [
                  {
                      margin_top: 10,
                      position: 'inside top',
                      label: { text: 'DISCRETIONARY INCOME', style_fontSize: 16 }
                  }
              ],
              yAxis: { label_text: 'Cost', formatString: 'c' },
              defaultSeries: {
                  shape_innerPadding: 6,
                  defaultPoint: {
                      label: {
                          text: '%name <b>%yValuek</b> (%percentOfSeries%)',
                          placement: 'auto'
                      }
                  }
              },
              series: [
                  {
                      name: 'Costs',
                      palette: 'default',
                      points: [
                          { name: 'HOUSEHOLD INCOME <br> BEFORE TAX', y: 60 },
                          { name: 'INCOME AFTER TAX', y: 55 },
                          { name: 'COST OF NON SHELTER <br>NECESSITIES', y: 30 },
                          { name: 'RESIDUAL INCOME', y: 15 },
                          { name: 'SHELTER COST', y: 14 },
                          { name: '<b>DISCRETIONARY INCOME</b>', y: 1 }
                      ]
                  }
              ]
          });
      
      
          const chart4 = new Chart(main_page3_first_one_txt_chart_main, {
              type: 'horizontalBar',
              data: {
                  labels: ['$40,000-49,000', '$50,000-59,000', '$60,000-79,000', '$80,000-99,999', '$100,000+'],
                  datasets: [{
                      label: 'INCOME CATEGORIES',
                      data: [100, 1200, 1500, 2000, 2500],
                      backgroundColor: 'skyblue',
                      borderWidth: 1,
                  }],
              },
              options: {
                  responsive: true,
                  legend: {
                      display: false,
                  },
                  title: {
                      display: true,
                      text: 'INCOME CATEGORIES',
                  },
                  scales: {
                      xAxes: [{
      
                          ticks: {
                              beginAtZero: true,
                          },
                      }],
                      yAxes: [{
                          barPercentage: 1,
                          stacked: true,
                          ticks: {
                          }
                      }],
                  },
      
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'index',
                      intersect: false,
                  },
              },
              animation: {
                  duration: 0
              }
          });
      
      
          const chart28 = new Chart(main_page6_first_one_charts_two_28, {
              type: 'bar', // Chart type
              data: {
                  labels: ['CMA1',
                      'CMA2',
                      'CMA3',
                      'CMA4',
                      'CMA5'], // Data labels
                  datasets: [
                      {
                          label: 'CMA', // Dataset label
                          data: [500, 1000, 2500, 1500, 2000], // Data values
                          backgroundColor: '#00CADC', // Bar background color
                          borderColor: '#00CADC', // Bar border color
                          // borderWidth: 1, // Bar border width
                          borderRadius: 20,
                      }
                  ],
              },
              options: {
                  responsive: true, // Make the chart responsive
                  title: {
                      display: false, // Display chart title
                      text: 'Sales by Quarter', // Chart title text
                  },
                  legend: {
                      display: false, // Hide chart legend
                  },
                  scales: {
                      yAxes: [{
      
                          ticks: {
                              beginAtZero: true, // Start y-axis at zero
                          },
                      }],
                      xAxes: [{
                          barThickness: 40,
                          categoryPercentage: 0.5, // Adjust bar spacing
      
                      }],
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart27 = new Chart(main_page6_first_one_charts_one_27, {
              type: 'bar', // Chart type
              data: {
                  labels: ['CMA1',
                      'CMA2',
                      'CMA3',
                      'CMA4',
                      'CMA5'], // Data labels
                  datasets: [
                      {
                          label: 'CMA', // Dataset label
                          data: [500, 1000, 2500, 1500, 2000], // Data values
                          backgroundColor: '#00CADC', // Bar background color
                          borderColor: '#00CADC', // Bar border color
                          // borderWidth: 1, // Bar border width
                      }
                  ],
              },
              options: {
                  responsive: true, // Make the chart responsive
                  title: {
                      display: false, // Display chart title
                      text: 'Sales by Quarter', // Chart title text
                  },
                  legend: {
                      display: false, // Hide chart legend
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true, // Start y-axis at zero
                          },
                      }],
                      xAxes: [{
                          categoryPercentage: 0.5, // Adjust bar spacing
                          barThickness: 40
                      }],
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart25 = new Chart(main_page6_first_one_charts_one_25, {
              type: 'bar', // Chart type
              data: {
                  labels: ['Alberta',
                      'British Columbia',
                      'Manitoba',
                      'New Brunswick',
                      'Newfoundland and Labrador',
                      'Nova Scotia',
                      'Ontario',
                      'Prince Edward Island',
                      'Quebec',
                      'Saskatchewan'], // Data labels
                  datasets: [
                      {
                          label: 'CMA', // Dataset label
                          data: [20, 3, 5, 10, 12, 15, 20, 9, 25, 30], // Data values
                          backgroundColor: '#BC1823', // Bar background color
                          borderColor: '#BC1823', // Bar border color
                          // borderWidth: 1, // Bar border width
                      }
                  ],
              },
              options: {
                  responsive: true, // Make the chart responsive
                  title: {
                      display: false, // Display chart title
                      text: 'Sales by Quarter', // Chart title text
                  },
                  legend: {
                      display: false, // Hide chart legend
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true, // Start y-axis at zero
                          },
                      }],
                      xAxes: [{
                          categoryPercentage: 0.5, // Adjust bar spacing
      
                      }],
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart26 = new Chart(main_page6_first_one_charts_two_26, {
              type: 'bar', // Chart type
              data: {
                  labels: ['Alberta',
                      'British Columbia',
                      'Manitoba',
                      'New Brunswick',
                      'Newfoundland and Labrador',
                      'Nova Scotia',
                      'Ontario',
                      'Prince Edward Island',
                      'Quebec',
                      'Saskatchewan'], // Data labels
                  datasets: [
                      {
                          label: 'CMA', // Dataset label
                          data: [20, 3, 5, 10, 12, 15, 20, 9, 25, 30], // Data values
                          backgroundColor: '#009299', // Bar background color
                          borderColor: '#009299', // Bar border color
                          // borderWidth: 1, // Bar border width
                      }
                  ],
              },
              options: {
                  responsive: true, // Make the chart responsive
                  title: {
                      display: false, // Display chart title
                      text: 'Sales by Quarter', // Chart title text
                  },
                  legend: {
                      display: false, // Hide chart legend
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true, // Start y-axis at zero
                          },
                      }],
                      xAxes: [{
                          categoryPercentage: 0.5, // Adjust bar spacing
      
                      }],
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart22 = new Chart(main_page6_first_one_charts_two_22, {
              type: 'bar', // Chart type
              data: {
                  labels: ['No bedroom', '1 bedroom', '2 bedroom', '3 bedroom'], // Data labels
                  datasets: [
                      {
                          label: 'CMA', // Dataset label
                          data: [100, 120, 150, 180], // Data values
                          backgroundColor: '#009299', // Bar background color
                          borderColor: '#009299', // Bar border color
                          borderWidth: 2, // Bar border width
                      },
                      {
                          label: 'Province', // Dataset label
                          data: [200, 120, 150, 180], // Data values
                          backgroundColor: '#ED7D31', // Bar background color
                          borderColor: '#ED7D31', // Bar border color
                          borderWidth: 2, // Bar border width
                      },
                      {
                          label: 'CANADA', // Dataset label
                          data: [50, 120, 150, 180], // Data values
                          backgroundColor: '#65A6FA', // Bar background color
                          borderColor: '#65A6FA', // Bar border color
                          borderWidth: 2, // Bar border width
                      }
                  ],
              },
              options: {
                  responsive: true, // Make the chart responsive
                  title: {
                      display: false, // Display chart title
                      text: 'Sales by Quarter', // Chart title text
                  },
                  legend: {
                      display: true, // Hide chart legend
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true, // Start y-axis at zero
                          },
                      }],
                      xAxes: [{
                          categoryPercentage: 0.5, // Adjust bar spacing
      
                      }],
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart21 = new Chart(main_page6_first_one_charts_one_21, {
              // Chart type
              type: 'horizontalBar',
      
              // Data
              data: {
                  labels: ['CMA', 'Province', 'CANADA'],
                  datasets: [{
                      label: 'Average Rent',
                      data: [2000, 2300, 2500],
                      backgroundColor: '#009299',
                      // borderColor: '#000',
                      borderColor: "rgba(0,0,0,0)",
                      borderWidth: 10,
                      barThickness: 40,
                      // maxBarThickness: 40,
                  }],
              },
      
              // Options
              options: {
      
                  responsive: true,
                  legend: {
                      display: false,
                  },
                  title: {
                      display: true,
                      text: 'Average Rent',
                  },
                  scales: {
                      xAxes: [{
                          barPercentage: 5,
                          ticks: {
                              beginAtZero: true,
                              // fontSize: 10
                          },
                          gridLines: {
                              // tickMarkLength: 20
                          },
                      }],
                      yAxes: [{
                          // barPercentage: 1.5,
                          barThickness: 25,
                          stacked: true,
                          ticks: {
                              // fontSize: 8
                          },
      
                      }],
                  },
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'index',
                      intersect: false,
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart23 = new Chart(main_page6_first_one_charts_one_23, {
              // Chart type
              type: 'horizontalBar',
      
              // Data
              data: {
                  labels: ['CMA', 'Province', 'CANADA'],
                  datasets: [{
                      label: 'Average Rent',
                      data: [3.5, 4.5, 5],
                      backgroundColor: '#4472C4',
                      // borderColor: '#000',
                      borderWidth: 1,
                  }],
              },
      
              // Options
              options: {
      
                  responsive: true,
                  legend: {
                      display: false,
                  },
                  title: {
                      display: true,
                      text: 'Growth Rate',
                  },
                  scales: {
                      xAxes: [{
      
                          ticks: {
                              beginAtZero: true,
                              // fontSize: 10
                          },
      
                      }],
                      yAxes: [{
                          barPercentage: 1,
                          stacked: true,
                          ticks: {
                              // fontSize: 8
                          },
                      }],
                  },
      
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'index',
                      intersect: false,
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
          const chart18 = new Chart(main_page5_first_one_chart18, {
              // Chart type
              type: 'horizontalBar',
      
              // Data
              data: {
                  labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
                  datasets: [{
                      label: 'INCOME CATEGORIES',
                      data: [4000, 3000, 2500, 2000, 1500, 1000],
                      backgroundColor: '#00CADC',
                      // borderColor: '#000',
                      borderWidth: 1,
                  }],
              },
      
              // Options
              options: {
                  responsive: true,
                  legend: {
                      display: false,
                  },
                  title: {
                      display: false,
                      text: 'INCOME CATEGORIES',
                  },
                  scales: {
                      xAxes: [{
      
                          ticks: {
                              beginAtZero: true,
                              // fontSize: 10
                          },
                      }],
                      yAxes: [{
                          barPercentage: 1,
                          stacked: true,
                          ticks: {
                              // fontSize: 8
                          }
                      }],
                  },
      
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'index',
                      intersect: false,
                  },
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
      
      
          var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
          var yValues = [55, 49, 44, 24, 15];
          var barColors = ["red", "green", "blue", "orange", "brown"];
          const chart = new Chart(main_page3_first_one_chart_main, {
              type: 'bar',
              data: {
                  labels: ['OB', '18', '28', '3B+'],
                  datasets: [{
                      label: 'Current stock',
                      data: [1500, 3000, 5800, 1900],
                      backgroundColor: '#009299',
      
                  }, {
                      label: 'New stock added',
                      data: [500, 1000, 2000, 3000],
                      backgroundColor: '#003F72',
                  }],
              },
              options: {
                  animation: {
                      duration: 0
                  },
                  legend: {
                      display: false,
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                          },
                      }],
                      xAxes: [{
                          barPercentage: 0.8,
                          gridLines: {
                              display: false
                          },
                      }]
                  },
              },
          });
      
      
      
          const canvas = document.getElementById('main_page3_first_one_pichart');
          const chart2 = new Chart(canvas, {
              type: 'pie',
              data: {
                  labels: ['RENTAL', 'OWNED'],
                  datasets: [{
                      data: [33.3, 66.7],
                      backgroundColor: ['#009299', '#003F72'],
                  }],
              },
              options: {
                  legend: {
                      display: true,
                      position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Growth Rate',
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.value + '%';
                          },
                      },
                  },
                  borderColor: '#000',
                  borderWidth: 1,
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
      
          chart2.options.beforeDraw = function (chart, args, options) {
              const ctx = chart2.ctx;
              ctx.fillStyle = '#000';
              ctx.font = '16px Arial';
              ctx.fillText('■ OWNED', 10, 10);
              ctx.fillStyle = '#fff';
              ctx.fillText('☐ RENTAL', 10, 25);
          };
      
      
          const chart5 = new Chart(main_page3_first_one_chart3, {
              type: 'doughnut',
              data: {
                  labels: ['40%', '60%'],
                  datasets: [{
                      data: [40, 60],
                      backgroundColor: ['red', 'black'],
                  }],
              },
              options: {
                  legend: {
                      display: false,
                      position: 'bottom',
                  },
                  title: {
                      display: false,
                      text: 'Distribution of Stock',
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.value + '%';
                          },
                      },
                  },
                  borderColor: '#000',
                  borderWidth: 1,
                  animation: {
                      duration: 0
                  }
              },
          });
          const chart16 = new Chart(main_page5_first_one_one_chart16, {
              type: 'doughnut',
              data: {
                  labels: ['40%', '60%'],
                  datasets: [{
                      data: [40, 60],
                      backgroundColor: ['red', 'black'],
                  }],
              },
              options: {
                  legend: {
                      display: false,
                      position: 'bottom',
                  },
                  title: {
                      display: true,
                      text: 'Distribution of Stock',
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.value + '%';
                          },
                      },
                  },
                  borderColor: '#000',
                  borderWidth: 1,
                  animation: {
                      duration: 0
                  }
              },
          });
      
      
      </script>
      
      </html>`;
      await page.setContent(htmlContent);
      const pdfFilePath = "output.pdf";
      const pdfBuffer = await page.pdf({
        path: pdfFilePath,
        format: "A3",
        printBackground: true,
        // scale: 1.056,
        scale: 1.054,
      });
      const params = {
        Bucket: process.env.S3_AWS_BUCKET,
        Key: `/${Common.helper.generateId()} `,
        Body: pdfBuffer,
        ContentType: "application/pdf",
      };

      try {
        const uploadResult = await s3.upload(params).promise();
        return uploadResult;
      } catch (error) {
        console.error("Error uploading PDF to S3:", error);
      }
      // Close Puppeteer browser
      await browser.close();
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  simplePdfGenerator: async (data) => {
    let {
      province,
      rent_source,
      income_before_tax,
      income_after_tax,
      source_of_cost,
      all_outcome,
      outcome,
    } = data;
    province = province.toUpperCase();

    const organizedOutcome = outcome.reduce((acc, current) => {
      const { cma, ca } = current;
      let keyy = "";
      if (cma !== "NA") {
        keyy = cma.toUpperCase() + " - [ CMA ]";
      } else {
        keyy = ca.toUpperCase() + " - [ CA ]";
      }

      if (!acc[keyy]) {
        acc[keyy] = [];
      }
      acc[keyy].push(current);
      return acc;
    }, {});
    const organizedAllOutcome = all_outcome.reduce((acc, current) => {
      const { cma } = current;
      let keyy = "";
      if (cma !== "NA") {
        keyy = "CMA";
      } else {
        keyy = "CA";
      }
      if (!acc[keyy]) {
        acc[keyy] = [];
      }
      acc[keyy].push(current);
      return acc;
    }, {});
    Object.keys(organizedAllOutcome).map((prov, index) => {
      const data = organizedAllOutcome[prov];
      organizedAllOutcome[prov] = {};
      data.map((obj) => {
        const { house_type, cma, ca } = obj;

        if (!organizedAllOutcome[prov][house_type]) {
          organizedAllOutcome[prov][house_type] = {};
        }
        if (cma) {
          if (!organizedAllOutcome[prov][house_type][cma]) {
            organizedAllOutcome[prov][house_type][cma] = [];
          }
          organizedAllOutcome[prov][house_type][cma].push(obj);
        } else {
          if (!organizedAllOutcome[prov][house_type][ca]) {
            organizedAllOutcome[prov][house_type][ca] = [];
          }
          organizedAllOutcome[prov][house_type][ca].push(obj);
        }
      });
    });

    let firstTableHtml = ``;
    let secondTableHtml = ``;
    let htmlObj = ``;

    Object.keys(organizedAllOutcome).map((prov, index) => {
      const province = prov;
      const dataBasedOnType = organizedAllOutcome[province];
      let rowsHtmlApartment = ``;
      let rowsHtmlRow = ``;
      Object.keys(dataBasedOnType).map((type, type_index) => {
        const house_type = type;
        const dataBasedOnHouseType = organizedAllOutcome[province][house_type];
        Object.keys(dataBasedOnHouseType).map((geo, geo_index) => {
          const cma_ca = geo;
          const dataBasedOnGeography =
            organizedAllOutcome[province][house_type][cma_ca];
          let b0str = ``,
            b1str = ``,
            b2str = ``,
            b3str = ``;
          let optimal_income = 0;
          let pl = "";
          let city = "";
          dataBasedOnGeography.map((obj) => {
            pl = obj.province;
            city = obj.cma !== "NA" ? obj.cma : obj.ca;
            if (obj.bedroom_type === "0 Bedroom") {
              b0str = obj.household_affordable
                ? `<img width="17" height="17"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">`
                : `<img width="17" height="17"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">`;
            } else if (obj.bedroom_type === "1 Bedroom") {
              b1str = obj.household_affordable
                ? `<img width="17" height="17"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">`
                : `<img width="17" height="17"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">`;
            } else if (obj.bedroom_type === "2 Bedroom") {
              b2str = obj.household_affordable
                ? `<img width="17" height="17"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">`
                : `<img width="17" height="17"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">`;
            } else {
              b3str = obj.household_affordable
                ? `<img width="17" height="17"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">`
                : `<img width="17" height="17"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">`;
            }
            optimal_income = obj.optimal_income_before_tax;
          });
          if (house_type === "Apartment") {
            rowsHtmlApartment += ` <tr>
                                <td>${geo_index + 1}</td>
                                <td>${pl.toUpperCase()}</td>
                                <td>${city}</td>
                                <td>${b0str}</td>
                                <td>${b1str}</td>
                                <td>${b2str}</td>
                                <td>${b3str}</td>
                                <td>${
                                  optimal_income < 0 ? "-" : ""
                                }$${Math.ceil(
              Math.abs(optimal_income / 4)
            )}</td>
                            </tr>`;
          } else if (house_type === "Row") {
            rowsHtmlRow += ` <tr>
                                        <td>${geo_index + 1}</td>
                                        <td>${pl.toUpperCase()}</td>
                                        <td>${city}</td>
                                        <td>${b0str}</td>
                                        <td>${b1str}</td>
                                        <td>${b2str}</td>
                                        <td>${b3str}</td>
                                        <td>${
                                          optimal_income < 0 ? "-" : ""
                                        }$${Math.ceil(
              Math.abs(optimal_income / 4)
            )}
                                        </td>
                                    </tr>`;
          }
        });
      });
      htmlObj += ` <div  style="height:1500px">
                        <div class="main_first">
                            <div class="main_first_img">
                                <img src="https://i.ibb.co/WxYF57b/logo-1.png" alt="" style="height: 125px;width: 125px;">
                            </div>
                            <div class="main_first_text">
                                <div class="main_first_text_tex1">
                                CANADA - ${prov}’S AFFORDABILITY OVERVIEW FOR APARTMENTS
                                </div>
                            </div>
                        </div>
                        <div class="main_third">
                            <div class="main_third_line"></div>
                        </div>
                        <div class="main_fourth">
                            <div class="main_fourth_text2">
                                1] BASED ON 30% BENCHMARK
                            </div>
                        </div>
                        <div class="main_page2_first">
                            <table class="main_page2_first_table">
                                <tr class="main_page2_first_table_tr">
                                    <th class="main_page2_first_table_tr_th">SN</th>
                                    <th class="main_page2_first_table_tr_th" style="width:30%">Province</th>
                                    <th class="main_page2_first_table_tr_th" style="width:30%">CMA’S</th>
                                    <th class="main_page2_first_table_tr_th">0B</th>
                                    <th class="main_page2_first_table_tr_th">1B</th>
                                    <th class="main_page2_first_table_tr_th">2B</th>
                                    <th class="main_page2_first_table_tr_th">3B+</th>
                                    <th class="main_page2_first_table_tr_th">OPTIMAL INCOME</th>
                                </tr>
                                ${rowsHtmlApartment}
                            </table>
                        </div>
                    </div>
                    <div  style="height:1500px">
                    <div class="main_first">
                        <div class="main_first_img">
                            <img src="https://i.ibb.co/WxYF57b/logo-1.png" alt="" style="height: 125px;width: 125px;">
                        </div>
                        <div class="main_first_text">
                            <div class="main_first_text_tex1">
                            CANADA - ${prov}’S AFFORDABILITY OVERVIEW FOR ROWS
                            </div>
                        </div>
                    </div>
                    <div class="main_third">
                        <div class="main_third_line"></div>
                    </div>
                    <div class="main_fourth">
                        <div class="main_fourth_text2">
                            1] BASED ON 30% BENCHMARK
                        </div>
                    </div>
                    <div class="main_page2_first">
                        <table class="main_page2_first_table">
                            <tr class="main_page2_first_table_tr">
                                <th class="main_page2_first_table_tr_th">SN</th>
                                <th class="main_page2_first_table_tr_th" style="width:30%">Province</th>
                                <th class="main_page2_first_table_tr_th" style="width:30%">CMA’S</th>
                                <th class="main_page2_first_table_tr_th">0B</th>
                                <th class="main_page2_first_table_tr_th">1B</th>
                                <th class="main_page2_first_table_tr_th">2B</th>
                                <th class="main_page2_first_table_tr_th">3B+</th>
                                <th class="main_page2_first_table_tr_th">OPTIMAL INCOME</th>
                            </tr>
                            ${rowsHtmlRow}
                        </table>
                    </div>
                </div>
  `;
    });

    Object.keys(organizedOutcome).map((geo, index) => {
      if (index <= 4) {
        const data = organizedOutcome[geo];
        let rowsRow = ``;
        let rowsApartment = ``;
        data.map((obj) => {
          const bedroom_type =
            obj.bedroom_type === "0 Bedroom"
              ? "0B"
              : obj.bedroom_type === "1 Bedroom"
              ? "1B"
              : obj.bedroom_type === "2 Bedroom"
              ? "2B"
              : "3B+";

          if (obj.house_type === "Apartment") {
            let imgString = obj.household_affordable
              ? `<img width="17" height="17"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">`
              : `<img width="17" height="17"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">`;
            rowsApartment += ` <tr>
                                      <td>${bedroom_type}</td>
                                      <td>${imgString}</td>
                                      <td>${
                                        obj.optimal_income_before_tax < 0
                                          ? "-"
                                          : ""
                                      }$${Math.ceil(
              Math.abs(obj.optimal_income_before_tax)
            )}</td>
                                      <td>${
                                        obj.income_difference_by_income < 0
                                          ? "-"
                                          : ""
                                      }$${Math.ceil(
              Math.abs(obj.income_difference_by_income)
            )}</td>
                                  </tr>`;
          } else {
            let imgString = obj.household_affordable
              ? `<img width="17" height="17"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">`
              : `<img width="17" height="17"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">`;
            rowsRow += ` <tr>
            <td>${bedroom_type}</td>
            <td>${imgString}</td>
            <td>${obj.optimal_income_before_tax < 0 ? "-" : ""}$${Math.ceil(
              Math.abs(obj.optimal_income_before_tax)
            )}</td>
            <td>${obj.income_difference_by_income < 0 ? "-" : ""}$${Math.ceil(
              Math.abs(obj.income_difference_by_income)
            )}</td>
                            </tr>`;
          }
        });
        firstTableHtml += `<div class="main_five_main">
            <div class="main_five_right_float">
                ${index + 1}. ${geo}
            </div>
            <div class="main_five_right_left">
                <div class="main_five_right">
                    <div class="main_five_right_table">
                        <table>
                            <tr>
                                <th>NUMBER OF BEDROOMS</th>
                                <th>AFFORDABLE/ UNAFFORDABLE</th>
                                <th>OPTIMAL INCOME</th>
                                <th>INCOME SURPLUS / DEFICIT
                                </th>
                            </tr>
                            ${rowsApartment}
                        </table>
                    </div>
                </div>
                <div class="main_five_right">
                    <div class="main_five_right_table">
                        <table>
                            <tr>
                                <th>NUMBER OF BEDROOMS</th>
                                <th>AFFORDABLE/ UNAFFORDABLE</th>
                                <th>OPTIMAL INCOME</th>
                                <th>INCOME SURPLUS / DEFICIT
                                </th>
                            </tr>
                            ${rowsRow}
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
      }
    });
    Object.keys(organizedOutcome).map((geo, index) => {
      if (index <= 4) {
        const data = organizedOutcome[geo];
        let rowsRow = ``;
        let rowsApartment = ``;
        data.map((obj) => {
          const bedroom_type =
            obj.bedroom_type === "0 Bedroom"
              ? "0B"
              : obj.bedroom_type === "1 Bedroom"
              ? "1B"
              : obj.bedroom_type === "2 Bedroom"
              ? "2B"
              : "3B+";

          if (obj.house_type === "Apartment") {
            let imgString = obj.residual_affordable
              ? `<img width="17" height="17"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">`
              : `<img width="17" height="17"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">`;
            rowsApartment += ` <tr>
                                      <td>${bedroom_type}</td>
                                      <td>${imgString}</td>
                                      <td>${
                                        obj.optimal_income_after_tax < 0
                                          ? "-"
                                          : ""
                                      }$${Math.ceil(
              Math.abs(obj.optimal_income_after_tax)
            )}</td>
                                      <td>${
                                        obj.income_difference_by_residual < 0
                                          ? "-"
                                          : ""
                                      }$${Math.ceil(
              Math.abs(obj.income_difference_by_residual)
            )}</td>
                                  </tr>`;
          } else {
            let imgString = obj.residual_affordable
              ? `<img width="17" height="17"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">`
              : `<img width="17" height="17"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">`;
            rowsRow += ` <tr>
                                  <td>${bedroom_type}</td>
                                  <td>${imgString}</td>
                                  <td>${
                                    obj.optimal_income_after_tax < 0 ? "-" : ""
                                  }$${Math.ceil(
              Math.abs(obj.optimal_income_after_tax)
            )}</td>
                                  <td>${
                                    obj.income_difference_by_residual < 0
                                      ? "-"
                                      : ""
                                  }$${Math.ceil(
              Math.abs(obj.income_difference_by_residual)
            )}</td>
                            </tr>`;
          }
        });
        secondTableHtml += `<div class="main_five_main">
            <div class="main_five_right_float">
                ${index + 1}. ${geo}
            </div>
            <div class="main_five_right_left">
                <div class="main_five_right">
                    <div class="main_five_right_table">  
                        <table>
                            <tr>
                                <th>NUMBER OF BEDROOMS</th>
                                <th>AFFORDABLE/ UNAFFORDABLE</th>
                                <th>OPTIMAL INCOME</th>
                                <th>INCOME SURPLUS / DEFICIT
                                </th>
                            </tr>
                            ${rowsApartment}
                        </table>
                    </div>
                </div>
                <div class="main_five_right">
                    <div class="main_five_right_table">
                        <table>
                            <tr>
                                <th>NUMBER OF BEDROOMS</th>
                                <th>AFFORDABLE/ UNAFFORDABLE</th>
                                <th>OPTIMAL INCOME</th>
                                <th>INCOME SURPLUS / DEFICIT
                                </th>
                            </tr>
                            ${rowsRow}
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
      }
    });

    let rentSourceCheckBox1 =
      rent_source === "CMHC"
        ? ` <div>
                <label for="c1">CMHC</label>
                <input type="checkbox" id="c1" value="CMHC" checked class="myinput large">
            </div>`
        : ` <div>
                <label for="c1"> CMHC</label>
                <input type="checkbox" id="c1" value="CMHC" class="myinput large">
            </div>`;
    let rentSourceCheckBox2 =
      rent_source === "Realistic Rent"
        ? ` <div>
                <label for="c2">REALISTIC RENT</label>
                <input type="checkbox" id="c1" value="CMHC" checked class="myinput large">
            </div>`
        : ` <div>
                <label for="c2">REALISTIC RENT</label>
                <input type="checkbox" id="c1" value="CMHC" class="myinput large">
            </div>`;

    let sourceOfCostCheckBox1 =
      source_of_cost === "Average Household Expenses"
        ? ` <div>
                <label for="c3" class="small_label">AVERAGE HOUSEHOLD EXPENSES </label>
                <input type="checkbox" id="c3" value="CMHC" checked class="myinput large">
            </div>`
        : ` <div>
                <label for="c3" class="small_label">AVERAGE HOUSEHOLD EXPENSES </label>
                <input type="checkbox" id="c3" value="CMHC" class="myinput large">
            </div>`;
    let sourceOfCostCheckBox2 =
      source_of_cost === "Poverty Line Expenses"
        ? ` <div>
                <label for="c3" class="small_label">POVERTY LINE EXPENSES</label>
                <input type="checkbox" id="c3" value="CMHC" checked class="myinput large">
            </div>`
        : ` <div>
                <label for="c3" class="small_label">POVERTY LINE EXPENSES</label>
                <input type="checkbox" id="c3" value="CMHC" class="myinput large">
            </div>`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlContent = `
    <!DOCTYPE html>

<script src="/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
<script src="https://code.jscharting.com/latest/jscharting.js"></script>
<script type="text/javascript" src="https://code.jscharting.com/latest/modules/types.js"></script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- <link rel="stylesheet" href="/style.css"> -->
</head>

<style>
    body {
        width: 100%;
        margin: auto;
        background-color: #F0F3F8;
        padding: 3px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    input {
        border: 1px solid black;
        border-radius: 10px;
        background: transparent;
    }
    select {
        background: transparent;
        border: 1px solid black;
        border-radius: 4px;
        padding: 1px 4px;
        font-size: 20px;
        margin-left: 10px;
        width: 200px;
        text-align: center;
    }
    table {
        border-collapse: collapse;
    }
    table td,
    table th {
        border: 1.5px black;
        border-style: dashed;
        font-size: 13px;
    }

    table tr:first-child th {
        border-top: 0;
    }

    table tr:last-child td {
        border-bottom: 0;
    }

    table tr td:first-child,
    table tr th:first-child {
        border-left: 0;
    }

    table tr td:last-child,
    table tr th:last-child {
        border-right: 0;
    }

    .main {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .main_first {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        width: 100%;
        z-index: 1;
    }
    .main_first_img {
        width: 200px;
    }
    .main_first_img img {
        width: 100%;
    }
    .main_first_text {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        text-align: center;
        width: 70%;
    }

    .main_first_text_tex1 {
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 0.5cap;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .main_first_text_tex2 {
        font-size: 44px;
        font-weight: bolder;
        color: #D77723;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .main_second {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
    }

    .main_second1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
    }

    .main_second2 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: self-start;
        width: 50%;
        z-index: 2;
    }

    .main_second2 label {
        font-weight: 100;
        border: 1.5px solid black;
        padding: 1px 6px;
        border-radius: 7px;
        text-align: center;
        width: 150px;
        text-align: center;
    }

    /* FOR SMALL LABEL ON UPPER PART OF PDF */
    .small_label {
        font-size: 12px;
    }


    .main_second_select1 {
        display: flex;
        margin-bottom: 10px;
        text-align: center;
        align-items: flex-start;
    }

    .main_second_select1_check {
        display: flex;
        flex-direction: column;
    }

    .myinput.large {
        height: 22px;
        width: 22px;
        background-color: transparent;
    }

    .myinput.large[type="checkbox"]:before {
        width: 20px;
        height: 20px;
        position: relative;
        display: block;
        border: 1px solid #808080;
        background: #FFF;
    }

    .myinput.large[type="checkbox"]:after {
        top: -20px;
        width: 16px;
        height: 16px;
        position: relative;
        display: block;
    }

    .main_second_select1_check div {
        margin-bottom: 10px;
        margin-left: 10px;
        display: flex;
    }

    .main_third {
        display: flex;
        flex-direction: column;
        width: 95%;
        margin: auto;
    }

    .main_third_text {
        display: flex;
        justify-content: space-around;
        font-size: 13px;
    }

    .main_third_line {
        width: 100%;
        height: 1.5px;
        background-color: #7ED957;
        margin-bottom: 15px;
    }

    .main_fourth {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .main_fourth_text1 {
        text-align: center;
        letter-spacing: 0.3cap;
        margin-bottom: 7px;
        font-size: 18px;
        padding: 0px 7px;
    }

    .main_fourth_text2 {
        font-weight: bold;
        text-align: center;
        letter-spacing: 0.2cap;
        font-size: 25px;
        margin-top: 5px;
    }

    .main_five {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }

    .main_five_head {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }

    .main_five_right_head {
        font-size: 27px;
        font-weight: bolder;
        text-decoration: underline;
        letter-spacing: 0.3cap;
        background-color: #683733;
        color:white;
        border-radius: 40px;
        padding: 7px 10px;
    }

    .main_five_main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .main_five_right_float {
        font-size: 29px;
        font-weight: bolder;
        text-align: center;
        background-color: #c1ac7f;
        font-style: italic;
        border-radius: 7px;
        padding: 2px 10px;
        margin-top: 10px;
        color: white;
        margin-bottom: 10px;
        z-index: 1;
    }

    .main_five_right_left {
        display: flex;
        width: 90%;
        font-size: 10px;
        justify-content: space-between;
        align-items: center;
        margin: auto;
    }

    .main_five_right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: bold;
        width: 45%;
    }

    .main_float_line {
        height: 1020px;
        margin-top:80px;
        position: absolute;
        width: 0px;
        border-left: 1.5px dashed black;
        left: 50%;
        transform: translateX(-50%);
        top: 400px;
    }

    .page1_footer {
        font-size: 10px;
        letter-spacing: 1.3cap;
        text-align: center;
        padding: 3px 3px;
    }

    .main_page2_first {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 10px;
    }

    .main_page2_first_table {
        border: 1.5px solid black;
        width: 90%;
        margin: auto;
        text-align: center;
    }

    .main_page2_first_table:first-child {
        border: 1.5px solid black;
        width: 90%;
        margin: auto;
        text-align: center;
        margin-bottom: 10px;
    }

    .main_page2_first_table tr {
        border: 1.5px solid black;
    }

    .main_page2_first_table th {
        border: 1.5px solid black;
        padding: 10px 4px;
        background-color: #C7DDEF;
        font-size: 18px;
    }

    .main_page2_first_table td {
        border: 1.5px solid black;
        padding: 10px 4px;
        font-size: 18px;

    }

    .main_page3_first {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        margin-top: 5px;
        width: 100%;
        text-align: center;
    }

    .main_page3_first_one {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 31%;
    }

    .main_page3_first_one_txt {
        font-weight: bold;
        letter-spacing: 0.3cap;
        text-decoration: underline;
        font-size: 21px;
    }

    .main_page3_first_one_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: baseline;
        margin-top: 10px;
    }

    .main_page3_first_one_content_one {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .main_page3_first_one_content_one_head {
        font-weight: bold;
        font-size: 21px;
        padding: 4px 4px;
        border: 1.4px solid black;
        background-color: white;
        text-align: center;
        border-radius: 4px;
    }

    .main_page3_first_one_content_one_buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin: 10px 0px;
        font-size: 19px;
    }

    .main_page3_first_one_content_one_buttons_button {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        background-color: #009299;
        width: auto;
        margin: 4px;
        padding: 2px 7px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
    }

    .main_page3_first_one_content_one_buttons_button span {
        margin: 0px 15px 0px 0px !important;
    }

    .main_page3_first_one_sub {
        font-size: 10px;
        margin: 3px 0px;
        text-align: center;
    }

    .main_page3_first_one_chart canvas {
        max-width: 100%;
    }

    .main_page3_first_one_break {
        height: 230px;
        border-left: 1.5px solid gray;
        padding: 0px 2px;
    }

    .main_page3_second {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    }

    .main_page3_second_one {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 60%;
    }

    .main_page3_first_one_other {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 90%;
    }

    .main_page3_first_one_other_one {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .main_page3_first_one_other_one_main {
        width: 150px;
        height: 150px;
        background-size: contain;
        background-image: url("data:image/png;base64,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");
        background-repeat: no-repeat;
        background-position: center;
        text-align: center;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main_page3_first_one_other_one_text {
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        letter-spacing: 0.3cap;
    }

    .main_page3_first_one_other_one_sub {
        font-size: 10px;
        color: gray;
    }

    .main_page3_second_two {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        width: 35%;
        padding: 2px 15px;
        text-align: center;
    }

    #main_page3_first_one_chart3 {
        max-width: 200px;
        align-self: center;
    }

    .main_page3_third {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        text-align: center;
        width: 100%;
    }

    .main_page3_third_one {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 45%;
        padding: 0px 5px;
    }

    .main_page3_first_one_sub2 {
        font-size: 12px;
        font-style: italic;
        font-weight: bold;
        margin: 4px 0px;
    }

    .main_page3_first_one_main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        width: 100%;
    }

    .main_page3_first_one_main_head {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        font-weight: bold;
        letter-spacing: 0.3cap;
        width: 100%;
        margin: 5px 0;
    }

    .main_page3_first_one_main_head_head:first-child {
        margin-right: 25px;
    }

    .main_page3_first_one_main_head_sub {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        width: 100%;
        margin-bottom: 10px;
    }

    .main_page3_first_one_main_head_sub_two {
        color: #09429C;
        font-weight: bolder;
        background-color: #FFDE59;
        padding: 3px 10px;
        border-radius: 10px;
        font-style: italic;
    }

    .main_page3_first_one_one {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        /* margin-top: 20px; */
    }

    .main_page3_first_one_one_one {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: bolder;
        background-color: white;
        border-radius: 20px;
        padding: 3px 15px;
    }

    .main_page3_first_one_one_num {
        font-size: 28px;
    }

    .main_page3_first_one_two {
        margin-top: 20px;
    }

    .main_page3_first_one_two table {
        font-size: 14px;
    }

    .main_page3_first_one_two th {
        padding: 0px 10px;
    }

    .main_page3_first_one_two td {
        padding: 10px 10px;
        font-weight: bold;
    }

    .bigtd {
        font-size: 30px;
    }

    .main_page3_four {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        text-align: center;

    }

    .main_page3_four_one:first-child {
        width: 45%;
    }

    .main_page3_four_one:last-child {
        width: 50%;
    }

    .main_page3_first_one_txt_chart {
        width: 100%;
    }

    .main_page3_first_one_txt_chart canvas {
        width: 50%;
        max-width: 400px;
    }

    .main_page3_first_one_tri {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main_page4_first {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
    }

    .main_page4_first_one {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 20px;
        width: 90%;
    }

    .main_page4_first_one_one {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .main_page4_first_one_one_head {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.3cap;
        text-decoration: underline;
        text-align: center;
        background-color: white;
        border-radius: 10px;
        padding: 5px 7px;
        margin-bottom: 20px;
    }

    .main_page4_first_one_one_main {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
    }

    .main_page4_first_one_one_main_one {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .main_page4_first_one_one_main_one_head {
        font-size: 18px;
        text-decoration: underline;
        font-weight: bold;
        letter-spacing: 0.3cap;
    }

    .main_page4_first_one_one_main_one_sub {
        font-size: 18px;
        letter-spacing: 0.3cap;
        font-weight: bold;
    }

    .main_page4_first_one_one_main_one_chart canvas {
        max-width: 200px;
        display: block;
        height: 200px;
        width: 200px;
    }

    #main_page4_first_one_one_main_one_chart12 {
        width: 100%;
        height: 500px;
        max-width: 400px;
    }

    #main_page4_first_one_one_main_one_chart13 {
        width: 100%;
        height: 500px;
        max-width: 400px;
    }

    .main_page4_first_one:nth-child(2) {
        width: 100% !important;
    }

    .main_page4_first_one:nth-child(2) .main_page4_first_one_one {
        width: 50% !important;
    }
    .main_page4_first_one_one_main_one_chart {
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    .main_page4_first_one_one_main_one_chart_bar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .main_page4_first_one_one_main_one_chart_bar_big {
        width: 100px;
        height: 70px;
        background-color: #49C3FB;
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        font-weight: bolder;
    }
    .main_page4_first_one_one_main_one_chart_bar_small {
        width: 100px;
        height: 30px;
        background-color: #49C3FB;
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        font-weight: bolder;
        margin-top: 2px;
    }
    .main_page4_first_one_one_main_one_chart_bar_other {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .main_page4_first_one_one_main_one_chart_bar_other_head {
        font-size: 12px;
        text-decoration: underline;
        font-style: italic;
    }

    .main_page4_first_one_one_main_one_chart_bar_other_rate_num {
        /* margin: 0 !important; */
        font-size: 20px;
        font-weight: bold;
    }

    .main_page4_first_one_one_main_one_chart_bar_other_rate {
        font-style: italic;
        margin-top: 7px;
    }

    .main_page4_first_one_one_main_one_chart_bar_other_rate_who {
        margin: 0 !important;
        font-size: 10px;
        font-weight: bold;
    }

    .main_page4_first_one_one_main2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        text-align: center;
        width: 100%;

    }

    .main_page4_first_one_one_main_numone_num {
        font-size: 50px;
        font-weight: bolder;
    }

    .main_page4_first_one_one_main_numone_txt {
        font-size: 12px;
        font-weight: bold;
        margin-top: 4px;
    }

    .main_page4_first_one2 {
        justify-content: space-between !important;
        /* width: 100% !important; */
        width: 90%;
    }

    .main_page4_first_one2 .main_page4_first_one_one {
        width: 45%;
    }

    .main_page4_first_one_one_main_one_border {
        border-right: 1.8px dashed black;
        margin-right: 5px;
    }

    .main_third_line_new {
        width: 95% !important;
        margin-top: 5px;
    }

    #main_page5_first_one_chart19,
    #main_page5_first_one_chart20 {
        width: 400px;
    }

    .main_page5_first {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 95%;
    }

    .main_page5_first_one {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        text-align: center;
        width: 100%;
    }

    .main_page5_first_one_one {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40%;
    }

    .main_page5_first_one_one_num {
        font-size: 28px;
        font-weight: bolder;
        background-color: white;
        padding: 1px 7px;
        border-radius: 19px;
    }

    .main_page5_first_one_one_txt {
        font-size: 17px;
        font-weight: bold;
        text-decoration: underline;
        letter-spacing: 0.3cap;
        margin-top: 10px;
    }

    .main_page5_first_one_two {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .main_page5_first_one_one_chart canvas {
        max-width: 100px;
        height: 100px;
        width: 100%;
    }

    .main_page5_first_one:nth-child(2) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    .main_page5_first_one_txt {
        font-size: 20px;
        font-weight: bolder;
        text-decoration: underline;
        letter-spacing: 0.3cap;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .main_page5_first_one_chart canvas {
        margin-top: 30px;
    }
    .main_page5_first_one_one2 {
        width: 65%;
    }

    .main_page5_first_one_one2 canvas {
        width: 500px;
    }

    .main_page5_first_one_one3 {
        width: 45%;
    }

    .main_page5_first_one_one4 {
        width: 30% !important;
    }


    #main_page5_first_one_chart17 {
        width: 400px;
    }

    .main_page5_first_one_chart {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .main_page5_first_one_chart_other {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 80px;
        padding: 10px 25px;
        border-radius: 35px;
        background-color: #FFDE59;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
    }

    #main_page5_first_one_chart18 {
        width: 300px;
        max-width: 500px;
    }

    .main_page6_first {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .main_page6_first_one {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .main_page6_first_one_head {
        font-size: 24px;
        font-weight: bolder;
        text-decoration: underline;
        letter-spacing: 0.3cap;
        margin-bottom: 30px;
        margin-top: 20px;

    }

    .main_page6_first_one_charts {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 90%;
    }

    .main_page6_first_one_charts_one canvas {
        width: 500px;
    }

    .main_page6_first_one_charts_two {
        margin-left: 5px;
    }

    .main_page6_first_one_charts_two canvas {
        width: 400px;
        margin-left: 5px;
    }
    .main_page6_first_one_flex {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
        align-items: flex-start;
        text-align: center;
    }

    .main_page6_first_one_charts_three canvas {
        width: 400px;
    }

    .main_float_line2 {
        top: 130px !important;
        height: 1300px !important;
    }

    .main_float_line3 {
        height: 1150px !important;
        top: 715% !important;
        z-index: 0;
        left: 53%;
    }

    .main_page4_first_one_one_main_pluse_growth {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

<body>
    <div class="main">
        <div style="position: relative;height:1500px">
            <div class="main_first">
                <div class="main_first_img">
                <img src="https://i.ibb.co/WxYF57b/logo-1.png" alt="" style="height: 125px;width: 125px;">
                </div>
                <div class="main_first_text">
                    <div class="main_first_text_tex1">
                        ${province}
                    </div>
                    <div class="main_first_text_tex2">
                        KEY INSIGHTS
                    </div>
                </div>
            </div>
            <div class="main_second">
                <div class="main_second1">
                    <div class="main_second_select1">
                        <label class="label" for="cars">PROVINCE:</label>
                        <select name="cars" id="cars" style="width: 200px;margin-left: 130px;">
                            <option value="volvo">${province}</option>
                        </select>
                    </div>
                    <div class="main_second_select1">
                        <label class="label" for="cars">INCOME BEFORE TAX:</label>
                        <select name="cars" id="cars" style="width: 200px;">
                            <option value="volvo">${income_before_tax}</option>
                        </select>
                    </div>
                    <div class="main_second_select1">
                    <label class="label" for="cars">INCOME AFTER TAX:</label>
                    <select name="cars" id="cars" style="width: 200px; margin-left: 20px;">
                        <option value="volvo">${income_after_tax}</option>
                    </select>
                </div>
                </div>
                <div class="main_second2">
                    <div class="main_second_select1" style="margin-left: 40px;">
                        <div class="main_second_select1_label label">
                            RENT SOURCE :
                        </div>
                        <div class="main_second_select1_check" style="margin-left: 38px;">
                           ${rentSourceCheckBox1}
                            ${rentSourceCheckBox2}
                        </div>
                    </div>
                    <div class="main_second_select1">
                        <div class="main_second_select1_label label">
                            NON-SHELTER<br>
                            NECESSITIES SOURCE :
                        </div>
                        <div class="main_second_select1_check">
                            ${sourceOfCostCheckBox1}
                            ${sourceOfCostCheckBox2}
                        </div>
                    </div>
                </div>
            </div>
            <div class="main_third">
                <div class="main_third_text">
                    <span>
                        NOTE - B = Bedrooms
                    </span>
                    <span>
                        Latest availiable year will be selected by default
                    </span>
                </div>
                <div class="main_third_line">

                </div>
            </div>
            <div class="main_fourth">
                <div class="main_fourth_text1">
                Based on your income, below is the distribution of all the affordable & unaffordable type of house as  per different CMAs (Census Metropolitan Areas) & CAs (Census Areas)
                </div>
                <div class="main_fourth_text2">
                    BASED ON 30% BENCHMARK
                </div>
            </div>
            <div class="main_float_line">

            </div>
            <div class="main_five">
                <div class="main_five_head">
                    <div class="main_five_right_head">
                        APARTMENT
                    </div>
                    <div class="main_five_right_head">
                        ROW HOUSE
                    </div>
                </div>
                ${firstTableHtml}
            </div>
        </div>
        <!-- SECOND PAGE -->
        <div style="position: relative;height:1500px">
            <div class="main_first">
                <div class="main_first_img">
                <img src="https://i.ibb.co/WxYF57b/logo-1.png" alt="" style="height: 125px;width: 125px;">
                </div>
                <div class="main_first_text">
                    <div class="main_first_text_tex1">
                    ${province}
                    </div>
                    <div class="main_first_text_tex2">
                        KEY INSIGHTS
                    </div>
                </div>
            </div>
            <div class="main_second">
            <div class="main_second1">
                <div class="main_second_select1">
                    <label class="label" for="cars">PROVINCE:</label>
                    <select name="cars" id="cars" style="width: 200px;margin-left: 130px;">
                        <option value="volvo">${province}</option>
                    </select>
                </div>
                <div class="main_second_select1">
                    <label class="label" for="cars">INCOME BEFORE TAX:</label>
                    <select name="cars" id="cars" style="width: 200px;">
                        <option value="volvo">${income_before_tax}</option>
                    </select>
                </div>
                <div class="main_second_select1" >
                <label class="label" for="cars">INCOME AFTER TAX:</label>
                <select name="cars" id="cars" style="width: 200px; margin-left: 20px;">
                    <option value="volvo">${income_after_tax}</option>
                </select>
            </div>
            </div>
            <div class="main_second2">
                <div class="main_second_select1" style="margin-left: 40px;">
                    <div class="main_second_select1_label label">
                        RENT SOURCE :
                    </div>
                    <div class="main_second_select1_check" style="margin-left: 38px;">
                       ${rentSourceCheckBox1}
                        ${rentSourceCheckBox2}
                    </div>
                </div>
                <div class="main_second_select1">
                    <div class="main_second_select1_label label">
                        NON-SHELTER<br>
                        NECESSITIES SOURCE :
                    </div>
                    <div class="main_second_select1_check">
                        ${sourceOfCostCheckBox1}
                        ${sourceOfCostCheckBox2}
                    </div>
                </div>
            </div>
        </div>
            <div class="main_third" >
                <div class="main_third_text">
                    <span>
                        NOTE - B = Bedrooms
                    </span>
                    <span>
                        Latest availiable year will be selected by default
                    </span>
                </div>
                <div class="main_third_line">

                </div>
            </div>
            <div class="main_fourth">
                <div class="main_fourth_text1">
                Based on your income, below is the distribution of all the affordable & unaffordable type of house as  per different CMAs (Census Metropolitan Areas) & CAs (Census Areas)
                </div>
                <div class="main_fourth_text2">
                    BASED ON RESIDUAL INCOME
                </div>
            </div>
            <div class="main_float_line">

            </div>
            <div class="main_five">
                <div class="main_five_head">
                    <div class="main_five_right_head">
                        APARTMENT
                    </div>
                    <div class="main_five_right_head">
                        ROW HOUSE
                    </div>
                </div>
                ${secondTableHtml}
            </div>
        </div>
        ${htmlObj}
    </div>
</body>
</html>
    `;
    await page.setContent(htmlContent);
    const pdfFilePath = "output.pdf";
    const pdfBuffer = await page.pdf({
      path: pdfFilePath,
      format: "A3",
      printBackground: true,
      // scale: 1.056,
      scale: 1.054,
    });
    const params = {
      Bucket: process.env.S3_AWS_BUCKET,
      Key: `/${Common.helper.generateId()} `,
      Body: pdfBuffer,
      ContentType: "application/pdf",
    };

    try {
      const uploadResult = await s3.upload(params).promise();
      return uploadResult;
    } catch (error) {
      console.error("Error uploading PDF to S3:", error);
    }
    // Close Puppeteer browser
    await browser.close();
  },
};
