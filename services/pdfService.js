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
      return body;
    } catch (error) {
      logger.info(error);
      throw new Error(error);
    }
  },
  simplePdfGenerator: async (data) => {
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
        background-color: white;
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
        margin-top: 15px;
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


        <!-- FIRST PAGE -->
        <div style="position: relative;">
            <div class="main_first">
                <div class="main_first_img">
                    <img src="data:image/png;base64,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"
                        alt="">
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
                        <select name="cars" id="cars">
                            <option value="volvo">New Brunswick</option>
                        </select>
                    </div>
                    <div class="main_second_select1">
                        <label class="label" for="cars">INCOME:</label>
                        <select name="cars" id="cars">
                            <option value="volvo">50,000</option>
                        </select>
                    </div>
                </div>
                <div class="main_second2">
                    <div class="main_second_select1">
                        <div class="main_second_select1_label label">
                            RENT SOURCE :
                        </div>
                        <div class="main_second_select1_check">
                            <div>
                                <label for="c1">
                                    CMHC
                                </label>
                                <input type="checkbox" id="c1" value="CMHC" checked class="myinput large">
                            </div>
                            <div>
                                <label for="c2">
                                    REALISTIC RENT
                                </label>
                                <input type="checkbox" id="c2" value="CMHC" class="myinput large">
                            </div>
                        </div>
                    </div>
                    <div class="main_second_select1">
                        <div class="main_second_select1_label label">
                            NON-SHELTER<br>
                            NECESSITIES SOURCE :
                        </div>
                        <div class="main_second_select1_check">
                            <div>
                                <label for="c3" class="small_label">
                                    POVERTY LINE EXPENSES
                                </label>
                                <input type="checkbox" id="c3" value="CMHC" checked class="myinput large">
                            </div>
                            <div>
                                <label for="c4" class="small_label">
                                    AVERAGE HOUSEHOLD <br>EXPENSES
                                </label>
                                <input type="checkbox" id="c4" value="CMHC" class="myinput large">
                            </div>
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
                    BASED ON YOUR INCOME, BELOW IS THE DISTRIBUTI ON OF ALL THE AFFORDABLE & UNAFFORDABLE TYPE OF HOUSE
                    AS
                    PER DIFFERENT CMA’S & CA’S
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
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page1_footer">THIS WILL CONTINUE FOR ALL THE CMA’S & CA’S IN THIS PROVINCE</div>
        </div>




        <!-- SECOND PAGE -->
        <div style="position: relative;">
            <div class="main_first">
                <div class="main_first_img">
                    <img src="data:image/png;base64,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"
                        alt="">
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
                        <select name="cars" id="cars">
                            <option value="volvo">New Brunswick</option>
                        </select>
                    </div>
                    <div class="main_second_select1">
                        <label class="label" for="cars">INCOME:</label>
                        <select name="cars" id="cars">
                            <option value="volvo">50,000</option>
                        </select>
                    </div>
                </div>
                <div class="main_second2">
                    <div class="main_second_select1">
                        <div class="main_second_select1_label label">
                            RENT SOURCE :
                        </div>
                        <div class="main_second_select1_check">
                            <div>
                                <label for="c1">
                                    CMHC
                                </label>
                                <input type="checkbox" id="c1" value="CMHC" checked class="myinput large">
                            </div>
                            <div>
                                <label for="c2">
                                    REALISTIC RENT
                                </label>
                                <input type="checkbox" id="c2" value="CMHC" class="myinput large">
                            </div>
                        </div>
                    </div>
                    <div class="main_second_select1">
                        <div class="main_second_select1_label label">
                            NON-SHELTER<br>
                            NECESSITIES SOURCE :
                        </div>
                        <div class="main_second_select1_check">
                            <div>
                                <label for="c3" class="small_label">
                                    POVERTY LINE EXPENSES
                                </label>
                                <input type="checkbox" id="c3" value="CMHC" checked class="myinput large">
                            </div>
                            <div>
                                <label for="c4" class="small_label">
                                    AVERAGE HOUSEHOLD <br>EXPENSES
                                </label>
                                <input type="checkbox" id="c4" value="CMHC" class="myinput large">
                            </div>
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
                    BASED ON YOUR INCOME, BELOW IS THE DISTRIBUTI ON OF ALL THE AFFORDABLE & UNAFFORDABLE TYPE OF HOUSE
                    AS
                    PER DIFFERENT CMA’S & CA’S
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
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_five_main">
                    <div class="main_five_right_float">
                        1. MONCTON - [CMA]
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
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
                                    <tr>
                                        <td>0B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$48,000</td>
                                        <td>$2,000</td>
                                    </tr>
                                    <tr>
                                        <td>1B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                                        </td>
                                        <td>$50,000
                                        </td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>2B</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$55,000</td>
                                        <td>-$5000</td>
                                    </tr>
                                    <tr>
                                        <td>3B+</td>
                                        <td><img width="17" height="17"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                                        </td>
                                        <td>$67,000</td>
                                        <td>-$17,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page1_footer">THIS WILL CONTINUE FOR ALL THE CMA’S & CA’S IN THIS PROVINCE</div>
        </div>









        <!-- THIRD PAGE -->
        <div class="main_first">
            <div class="main_first_img">
                <img src="data:image/png;base64,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"
                    alt="">
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
                    <select name="cars" id="cars">
                        <option value="volvo">New Brunswick</option>
                    </select>
                </div>
                <div class="main_second_select1">
                    <label class="label" for="cars">INCOME:</label>
                    <select name="cars" id="cars">
                        <option value="volvo">50,000</option>
                    </select>
                </div>
            </div>
            <div class="main_second2">
                <div class="main_second_select1">
                    <div class="main_second_select1_label label">
                        RENT SOURCE :
                    </div>
                    <select name="cars" id="cars">
                        <option value="volvo">CMHC</option>
                    </select>
                    <!-- <div class="main_second_select1_check">
                        <div>
                            <label for="c1">
                                CMHC
                            </label>
                            <input type="checkbox" id="c1" value="CMHC" checked class="myinput large">
                        </div>
                        <div>
                            <label for="c2">
                                REALISTIC RENT
                            </label>
                            <input type="checkbox" id="c2" value="CMHC" class="myinput large">
                        </div>
                    </div> -->
                </div>
                <div class="main_second_select1">
                    <div class="main_second_select1_label label">
                        NON-SHELTER<br>
                        NECESSITIES SOURCE :
                    </div>
                    <div class="main_second_select1_check">
                        <select name="cars" id="cars">
                            <option value="volvo">MBA</option>
                        </select>
                        <!-- <div>
                            <label for="c3" class="small_label">
                                POVERTY LINE EXPENSES
                            </label>
                            <input type="checkbox" id="c3" value="CMHC" checked class="myinput large">
                        </div>
                        <div>
                            <label for="c4" class="small_label">
                                AVERAGE HOUSEHOLD <br>EXPENSES
                            </label>
                            <input type="checkbox" id="c4" value="CMHC" class="myinput large">
                        </div> -->
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
                LIST OF CMA’S & CA’S & THEIR AFFORDABILITY FOR APARTMENTS

            </div>
            <div class="main_fourth_text2">
                BASED ON 30% BENCHMARK
            </div>
        </div>
        <div class="main_page2_first">
            <table class="main_page2_first_table">
                <tr class="main_page2_first_table_tr">
                    <th class="main_page2_first_table_tr_th">Sr.No</th>
                    <th class="main_page2_first_table_tr_th">CMA’S</th>
                    <th class="main_page2_first_table_tr_th">0B</th>
                    <th class="main_page2_first_table_tr_th">1B</th>
                    <th class="main_page2_first_table_tr_th">2B</th>
                    <th class="main_page2_first_table_tr_th">3B+</th>
                    <th class="main_page2_first_table_tr_th">OPTIMAL INCOME</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>MONCTON</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td>$48,000</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>FREDRICTON</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td>$50,000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>

            </table>
        </div>
        <div class="main_page2_first">
            <table class="main_page2_first_table">
                <tr class="main_page2_first_table_tr">
                    <th class="main_page2_first_table_tr_th">Sr.No</th>
                    <th class="main_page2_first_table_tr_th">CMA’S</th>
                    <th class="main_page2_first_table_tr_th">0B</th>
                    <th class="main_page2_first_table_tr_th">1B</th>
                    <th class="main_page2_first_table_tr_th">2B</th>
                    <th class="main_page2_first_table_tr_th">3B+</th>
                    <th class="main_page2_first_table_tr_th">OPTIMAL INCOME</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>MONCTON</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td>$48,000</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>FREDRICTON</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACw0lEQVQ4jXWUQUxcVRSGv/++mUcHmJGOIixawzTAilbcKLAwxAU2JGpXaBfoqiGa0LT7LrpgY+KOhUFXDQsrq7rAEEwqcVEwLjpYVmBCFyV5I3EMA2XwMfOOi/dmmDbp3d17cr9zzn/+e2VmAJgZkqiE1fzD4M8vNvZ3ru0elYar9TCb8fzDQmdPcaR74MEHvVfu5fxMufWOzAwzw0Brwdb0wvbqfLUeZjGESBJgAhBkPP9wZnBidrx3aFFgQAyJzPTD7m93l54+umPgiIMJAizZKt4gEU31jc1dL7x/10nmANaCrekWQAxPSAams6IwQWTmlp4+urMWbE2bGa4SHucXtlfno0ZmSyjNUkzJESk5LpzLIwkDt7C9On94epL33r3x8Zd//PPXR0qy60yHGJYc+PK43T/JpxdG+fvkgGcnZWpW97v89pL7fX/nE2JxzQHdfo6UHMKswWuTZ7f7J7mSe4uUHOf9joZY2tjfueZ2j0rDyaA0cn7Avh66bjcvXbW0SwkwXx63+id1OXfRAH4OiqyUNhtds3tUGnbVephVIsAbbVml5fFOV59mL31IR6pNLQAtB0V+3FsnwmiMvFoPs5pa++bguBbmJPBwfHZxlKtvvg1gB7VjvZZqB7Dl4LGW9jaImgOPV8bzK67Q2VOMxcZqRNx/ts5KaRNAXekOA2gCErWbBgIrdPYU3XvdAz81vCGgbhH399ZZKW1aGNW0HDxmaW/DIuyF2w0zjHQPPNDBf8/zN9a/3a3Ww1xr2El0pTv49/R50/Uvr4znV74f/argcn57eWZwYlYQNaOCOkb59IhXAQTRzODEbDZ9ruwAxnuHFqf6xuZaQU2bv1Q+8WSiqb6xufHeoUVJKIoiJBGZ6dfgyfR327/Er7iVZY2ZvviKnWRmdvYVxMqKSnj8+sPgyeev/k8u38v57eXW1v4H6J1XumWlI4IAAAAASUVORK5CYIIA">
                    </td>
                    <td>$50,000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SAINT JOHN</td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td><img width="17" height="17"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVQ4jY1U7UtTURj/7Xr1buqaQ9MSNy5YWX7w7W7DlZSCoOm3oPVBZGGfeqEg+g+iLxHhB2EEkgwx7AWhHIkVqAgNtnuHhRau0Lv5wUlqzpftTrd7+jA27zaUfvDAOc85v995nuec56gIIVBCjknMztuRHsnntcTmeG7/92JNwZmaRabBxKubzF7t9Z4RilHHMkiEkLRFBY9JbK5d8OtBjjKxuXY+KnhMSl56sOnof+Avow+OE0hbGX2w6ei/n+KqCCGQfF7TSsdFNxJxGv+LPDpu+PTVqm4085QsSczaXbszJaC19aJy1AXawGZwaCOLylEXimy9SUciTq/duemUYxKDreHBPmWoUcFDCCFkP7BMlupY4teDLNWzZD+wTAgh5C/vIV7d4f6t4cE+ShI8FuWJq302HARF5BtZVI1PQdPSiqoPU8g3sogERQh2G0IyEJaT+yWf16wKtHJ87JvAZYeeIqYQCYpwd7UhGhTTvlMUUN7E8apfhuJtsrurza5bKoIU3N1t2Jidzqnv6eLCPaqgusafvUAbWVQMDGX46h1D0CgiSyGsKd6lmAaOPyqVSECEu7sNkaCIQiML68epHCH9pcszlJqzeJTO8qcDGQIbs9Nwdx0Kcc43GSIljSZf3pNXr3/sucauJTbWTwJAQpYhMRoI9hvpIsbDWwi53qOo+ixWhl9iZ/57sm7lFaG6F0674sVa3UgkaCB5fSE5J/1sEOvYxNXS9s5JCgDUTWa+7PGzR8ij4wCgo5LXd5zAuXsPn5e2d04mZzldfCHdxV4dyLg2075UV6yuf57oUPJUOf+JJDE770Z6JMFjic0Jpj+LP8+H1UV7+pYrMyWNnGC4ddtBn9BtKzn/AIJagbC5VNI1AAAAAElFTkSuQmCC">
                    </td>
                    <td>-$5000</td>
                </tr>


            </table>
        </div>
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
      console.log("PDF uploaded successfully:", uploadResult.Location);
    } catch (error) {
      console.error("Error uploading PDF to S3:", error);
    }

    // Close Puppeteer browser
    await browser.close();
  },
};
