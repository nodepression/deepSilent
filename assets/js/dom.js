/**
 * Created by weng on 2018/3/3.
 */


const dom0 = ` <div id="dowebok">
            <div class="section">
                <video id="video1" class=" covervid-wrapper covervid-video" loop="loop" data-autoplay width="100%" >
                    <source src="assets/video/test.mp4" type="video/mp4">
                </video>
                <div class="btn-box" id="know-btn"> <div class="btn-inner" >了解一下</div> </div>
            </div>
        </div>`



const dom1=` <div id="dowebok">
            <div class="section">
                    <h2 class="side-title">摘要</h2>
                    <h2 class="content-title">摘要</h2>
                    <div class="long-words-box" id="word1">
                                111111111这里是 简介 这里是简介这里是 简介 这里是简介
                                这里是 简介 这里是简介这里是 简介 这里是简介这里是
                                 简介 这里是简介这里是 简介 这里是简介这里是 简
                                  这里是简介这里是 简介 这里是简介这里是 简介 这里是简介这里是 简介 这里是简介 
                    </div>
            </div>
            <div class="section">
                <h2 class="side-title">功能1 识别</h2>

                <div class="video-area">
                <div class="change-speed">
                    <span>速度调整: </span>
                    <span><input class="speed" type="radio" name="vehicle" value="0.5" />0.5 </span>
                    <span><input class="speed" type="radio" name="vehicle" value="1.0" checked="checked" />1.0 </span>
                    <span><input class="speed" type="radio" name="vehicle" value="1.5" />1.5 </span>
                    <span><input class="speed" type="radio" name="vehicle" value="2.0" />2.0 </span>
                </div>

                <div class="real-area">
                    <video  id="testVideo" controls="controls" width="50%">
                        <source src="assets/video/test.mp4" type="video/mp4">
                    </video>
                </div>
                </div>

                <div class="btn-box">
                    <div class="btn-inner">试一试</div>
                </div>
                
            </div>

            <div class="section">
                <h2 class="side-title" style="margin-bottom: 10px;width: 90%">功能2 生成</h2>

                <div class="am-g two-boxes" style="height: 30vh" id="img-box">
                    <div class="am-u-sm-3" ><img src="assets/img/a.png" alt=""></div>
                    <div class="am-u-sm-1" ><img src="assets/img/plus.svg" alt=""></div>
                    <div class="am-u-sm-3" ><img src="assets/img/a.png" alt=""></div>
                    <div class="am-u-sm-1" ><img src="assets/img/equal.svg" alt=""></div>
                    <div class="am-u-sm-4"><img src="assets/img/a.png" alt=""></div>

                </div>
            </div>
        </div>`



const dom2 = `<div id="dowebok">
                <div class="section">
                <div class="am-g two-boxes" >
                    <div class="am-u-sm-6 video-box"><div>视频区</div><video id="player"  autoplay src="">视频区</video></div>
                    <div class="am-u-sm-6 video-box">文字（唇语翻译结果）</div>
                </div>
                <div class="bottom-options ">
                    <div class="btn-box" id="video-btn" > <div class="btn-inner">选择视频</div> </div>
                    <input type="file" id="videoFile" style="display:none">
                    <div class="btn-box"> <div class="btn-inner">开始测试</div> </div>
                    <div class="starrr"></div>
                    <div class="btn-box"> <div class="btn-inner">打分反馈</div> </div>
                </div>


            </div>
            <div class="section">
                <div class="am-g two-boxes" style="height: 30vh">
                    <div class="am-u-sm-6" id="pic1-left">图片</div>
                    <div class="am-u-sm-6 " id="pic2-right">高光图</div>
                </div>
                <div class="long-words-box" id="word1">
                    111111111
                </div>
                <!--<div class="slide"><h3>第二屏的第一屏</h3></div>-->
                <!--<div class="slide"><h3>第二屏的第二屏</h3></div>-->
                <!--<div class="slide"><h3>第二屏的第三屏</h3></div>-->
            </div>
            <div class="section">
                <div class="am-g two-boxes" style="height: 30vh">
                    <div class="am-u-sm-6" id="pic3-left">图片</div>
                    <div class="am-u-sm-6"><div id="word2">介绍介绍2222222222222</div> </div>

                </div>
            </div>
            </div>`


const dom3 = `<div id="dowebok">
               <div class="section">
                <div class="am-g two-boxes" >
                    <div class="am-u-sm-6 video-box"><div>摄像区</div><video id="camera"   autoplay src="">视频</video></div>
                    <div class="am-u-sm-6 video-box">文字（唇语翻译结果）</div>
                </div>
                <div class="bottom-options ">
                    <div class="btn-box" id="camera-btn"> <div class="btn-inner">开启摄像头</div> </div>
                    <div class="btn-box"> <div class="btn-inner">开始测试</div> </div>
                    <div class="starrr"></div>
                    <div class="btn-box"> <div class="btn-inner">打分反馈</div> </div>
                </div>


            </div>
            <div class="section">
                <div class="am-g two-boxes" style="height: 30vh">
                    <div class="am-u-sm-6" id="pic1-left">图片</div>
                    <div class="am-u-sm-6 " id="pic2-right">高光图</div>
                </div>
                <div class="long-words-box" id="word1">
                    111111111
                </div>
                <!--<div class="slide"><h3>第二屏的第一屏</h3></div>-->
                <!--<div class="slide"><h3>第二屏的第二屏</h3></div>-->
                <!--<div class="slide"><h3>第二屏的第三屏</h3></div>-->
            </div>
            <div class="section">
                <div class="am-g two-boxes" style="height: 30vh">
                    <div class="am-u-sm-6" id="pic3-left">图片</div>
                    <div class="am-u-sm-6"><div id="word2">介绍介绍2222222222222</div> </div>

                </div>
            </div>
            <div class="section"></div>
            </div>`