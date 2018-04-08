/**
 * Created by weng on 2018/3/3.
 */
const header=`<header class="my-nav" id="nav-bar">
<ul>
    <li class="active">111</li>
    <li>222</li>
    <li>333</li>
    <li>444</li>
    <!--<li>333</li>-->
</ul>
</header>`

const dom0 = ` <div id="dowebok">
            <div class="section">
                <video id="video1" class=" covervid-wrapper covervid-video" loop="loop" data-autoplay width="100%" >
                    <source src="assets/video/test.mp4" type="video/mp4">
                </video>
                <div class="btn-box" id="know-btn"> <div class="btn-inner" >了解一下</div> </div>
            </div>
        </div>`



const dom5=` <div id="dowebok">
            <div class="section">
            <div class="top-btn">
                    <div class="am-dropdown" id="chose-btn" data-am-dropdown>
                        <button class="am-btn am-btn-default am-dropdown-toggle" data-am-dropdown-toggle>选择视频 <span class="am-icon-caret-down"></span></button>
                        <ul class="am-dropdown-content" id="dropList">

                        </ul>
                      </div>
                      <button type="button" class="am-btn am-btn-default" id="upvideo">上传视频</button>
                      <input type="file" id="videoFile0" style="display:none">
                      <button type="button" class="am-btn am-btn-default" id="analyse">开始分析</button>
                      <button type="button" class="am-btn am-btn-default"><a id="down_button0">下载</a></button>
                      <button type="button" class="am-btn am-btn-default" style="display:none;"><a id="down_button1" >下载</a></button>
                      <button type="button" class="am-btn am-btn-default" style="display:none;"><a id="down_button2" >下载</a></button>
                      <button type="button" class="am-btn am-btn-default" style="display:none;"><a id="down_button3" >下载</a></button>
                </div>
                <div class="am-g two-boxes two-charts" >
                    <div class="am-u-sm-6 video-box">
                        <div class="am-panel am-panel-primary v-box">
                            <div class="am-panel-hd">折线图</div>
                            <div class="am-panel-bd" id="line-chart" style="height:100%">
                            </div>
                        </div>
                    </div>
                    <div class="am-u-sm-6 video-box">
                        <div class="am-panel am-panel-primary v-box">
                            <div class="am-panel-hd">柱状图</div>
                            <div class="am-panel-bd" id="c-chart" style="height:100%">
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="am-g two-boxes two-charts" >
                    <div class="am-u-sm-6 video-box">
                        <div class="am-panel am-panel-primary v-box">
                            <div class="am-panel-hd">饼状图</div>
                            <div class="am-panel-bd" style="height:100%" id="pin-chart">
                            
                            </div>
                        </div>
                    </div>
                    <div class="am-u-sm-6 video-box">
                        <div class="am-panel am-panel-primary v-box flex-box" id="_table">
                            <div class="am-panel-hd">表格</div>
                            <div class="am-panel-bd tc" style="height:100%">
                            <div id="table-chart">
                                <table class="am-table am-table-bordered am-table-radius am-table-striped">
                                    <thead>
                                        <tr>
                                            <th>时间</th>
                                            <th>事件描述</th>
                                            <th>可能性</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>   
        </div>`

// const deletedom=`<div class="section">
// <h2 class="side-title">摘要</h2>
// <h2 class="content-title">摘要</h2>
// <div class="long-words-box" id="word1">
//             111111111这里是 简介 这里是简介这里是 简介 这里是简介
//             这里是 简介 这里是简介这里是 简介 这里是简介这里是
//              简介 这里是简介这里是 简介 这里是简介这里是 简
//               这里是简介这里是 简介 这里是简介这里是 简介 这里是简介这里是 简介 这里是简介 
// </div>
// </div>
// <div class="section">
// <h2 class="side-title" style="margin-bottom: 10px;width: 90%">功能2 生成</h2>

// <div class="am-g two-boxes" style="height: 30vh" id="img-box">
// <div class="am-u-sm-3" ><img src="assets/img/a.png" alt=""></div>
// <div class="am-u-sm-1" ><img src="assets/img/plus.svg" alt=""></div>
// <div class="am-u-sm-3" ><img src="assets/img/a.png" alt=""></div>
// <div class="am-u-sm-1" ><img src="assets/img/equal.svg" alt=""></div>
// <div class="am-u-sm-4"><img src="assets/img/a.png" alt=""></div>

// </div>
// <div class="btn-box" id="try2">
// <div class="btn-inner">试一试</div>
// </div>
// </div> `

const dom3 = `<div id="dowebok">
                <div class="section">
                <div class="am-g two-boxes" style="margin-top: 5rem;">
                    <div class="am-u-sm-6 video-box">
                        <div class="am-panel am-panel-primary v-box">
                            <div class="am-panel-hd">视频区域</div>
                            <div class="am-panel-bd" style="padding:0">
                            <video id="player"  autoplay src="assets/video/test.mp4" controls="controls">视频区</video>
                            </div>
                        </div>
                    </div>
                    <div class="am-u-sm-6 video-box" id="toScreen">
                        <div class="am-panel am-panel-primary v-box">
                            <div class="am-panel-hd">分析结果</div>
                            <div class="am-panel-bd" style="height:80%">
                            <div id="col-chart"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="bottom-options ">
                    <div>
                        <div class="btn-box" id="video-btn" > <div class="btn-inner">选择视频</div> </div>
                        <input type="file" id="videoFile" style="display:none">
                        <div class="btn-box"> <div class="btn-inner" id="startTest">开始测试</div> </div>
                    </div>
                    <div>
                        <div class="starrr"></div>
                        <div class="btn-box" id="score-btn"> <div class="btn-inner">打分反馈</div> </div>
                        <div class="btn-box"> <div class="btn-inner"><a id="down_button">下载</a></div> </div>
                    </div>
                </div>


            </div>
            <div class="section" style="background-color: rgb(255, 255, 255);">
                <div class="am-g two-boxes" style="height: 30vh">
                    <div class="am-u-sm-6" id="pic3-left"><img src="assets/img/model.png" ></div>
                    <div class="am-u-sm-6">
                        <div id="word2">
                            Complete pipeline for multi-captioning videos with event descriptions. 
                            We first extract C3d features from the input video frames. These frames
                            are fed into our proposal network at varying stride to predict both short
                            as well as long events. Each proposal with it's start and end time and its
                            hidden representation is inputted into the captioning module, which uses context
                            from neighboring events to generate each event description.
                        </div> 
                    </div>

                </div>
            </div>
            </div>`


const dom4 = `<div id="dowebok">
                 <div class="section">
                    <div class="bottom-options" style="justify-content: space-between;margin-top:0;margin-bottom:3vh">
                        <div class="_buttons">
                            <div class="btn-box" id="video-btn" > 
                                <div class="btn-inner">选择视频</div> 
                            </div>
                            <input type="file" id="videoFile" style="display:none">


                            <div class="btn-box" id="startTest"> 
                                <div class="btn-inner">开始处理</div> 
                            </div>
                           
                        </div>
                        <div style="margin-right:80px">
                            <div class="starrr s2"></div>
                            <div class="btn-box" id="score-btn"> <div class="btn-inner">打分反馈</div> </div>
                        </div>
                    </div>
                    <div class="am-g two-boxes" >
                        <div class="am-u-sm-6 video-box">
                            <div class="am-panel am-panel-primary v-box">
                                <div class="am-panel-hd">视频区域</div>
                                <div class="am-panel-bd" style="padding:0">
                                    <video id="player1"  src="assets/video/test.mp4" controls="controls">视频区</video>
                                </div>
                            </div>
                        </div>
                        <div class="am-u-sm-6 video-box">
                            <div class="am-panel am-panel-primary v-box">
                                <div class="am-panel-hd">姿态标记</div>
                                <div class="am-panel-bd" style="padding:0" style="height:100%;width:100%;max-width:100%;max-height:100%">
                                    <video id="processed-video" src=""></video>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
               <!--<div class="section">-->
                    <!--<div class="am-g two-boxes" >-->
                        <!--<div class="am-u-sm-6 video-box"><div>摄像区</div><video id="camera"   autoplay src="">视频</video></div>-->
                        <!--<div class="am-u-sm-6 video-box">文字（唇语翻译结果）</div>-->
                    <!--</div>-->
                    <!--<div class="bottom-options ">-->
                        <!--<div class="btn-box" id="camera-btn"> <div class="btn-inner">开启摄像头</div> </div>-->
                        <!--<div class="btn-box"> <div class="btn-inner">开始测试</div> </div>-->
                        <!--<div class="starrr"></div>-->
                        <!--<div class="btn-box"> <div class="btn-inner">打分反馈</div> </div>-->
                    <!--</div>-->


                <!--</div>-->
                <div class="section">
                    <div class="am-g two-boxes" style="height: 30vh">
                        <div class="am-u-sm-6" id="pic3-left"><img src="assets/img/dataset.png"></div>
                        <div class="am-u-sm-6">
                            <div id="word2">
                                The ActivityNet Captions dataset connects videos to a series of 
                                temporally annotated sentence descriptions. Each sentence covers 
                                an unique segment of the video, describing multiple events that 
                                occur. These events may occur over very long or short periods of 
                                time and are not limited in any capacity, allowing them to co-occur. 
                                On average, each of the 20k videos contains 3.65 temporally localized 
                                sentences, resulting in a total of 100k sentences. We find that the number 
                                of sentences per video follows a relatively normal distribution. Furthermore, 
                                as the video duration increases, the number of sentences also increases. Each 
                                sentence has an average length of 13.48 words, which is also normally distributed. 
                                You can find more details of the dataset under the ActivityNet Captions Dataset section, 
                                and under supplementary materials in the paper.
                            </div> 
                        </div>

                    </div>
                </div>
                <div class="section" style="background-color: white">
                <h1 class="side-title" style="margin-top: 40px;">人体姿态估计</h1>

                <div class="video-area" style="width: 1010px;height: 490px;">
                <div class="change-speed" style="margin-bottom: 10px;">
                    <span><b>速度调整: </b></span>
                    <span><input class="speed" type="radio" name="vehicle" value="0.3" /><b>0.3 </b></span>
                    <span><input class="speed" type="radio" name="vehicle" value="0.5" checked="checked" /><b>0.5 </b></span>
                    <span><input class="speed" type="radio" name="vehicle" value="1.0" /><b>1.0 </b></span>
                    <span><input class="speed" type="radio" name="vehicle" value="2.0" /><b>2.0 </b></span>
                </div>

                <div class="real-area">
                    <video  id="testVideo" controls="controls">
                        <source src="assets/video/demo/demo3.mp4" type="video/mp4">
                    </video>
                </div>
                </div>


                
            </div>
               
        </div>`