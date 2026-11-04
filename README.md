# **IHUB规范说明**

##  1、文件命名规范
<li>命名强烈建议使用英文与数字的组合。</li>
<li>如需使用特殊字符，支持以下几个：@~-_。<font color="red">请勿使用中文名、空格、urlencode的保留字符和括号、$符号等。</font></li>
<li>请避免同一个文件名用全大写或全小写表示两个不同文件的情况。</li>
<br>

## 2、文件目录规范
### 2.1、URL路径
如图所示：<br/>
![task path](https://ihub.qq.com/markdown/project2.png)
点击文件名处的小图标也可获取文件对应的线上URL。<br/><br/>
  
### 2.2、路径与类型
![path type map](https://ihub.qq.com/markdown/readme3.png)

### 2.3、上传事项
1、<font color="red">图片文件请放置在上述线上文件目录下的ossweb-img文件夹或者webp-img文件夹，在这两个文件夹下可按需自由建立子文件夹进行存放。
</font><br/>
2、文件上传会校验文件实际类型，请勿直接修改文件后缀后上传<br/>
3、单文件大小限制为5M<br/>
4、压缩包的大小限制为50M（如从git上传不受限制）<br/><br/>

## 3、文件后缀规则
<font size=3>IHub支持绝大部分常规的文件类型，由于安全原因以及线上运营经验<font color="red">有部分后缀和文件限制发布</font>，主要信息如下：</font>
<li>以下后缀不支持发布:</li>
cpp、h、so、zip、c、sql、macros、template、o、a、txt、gz、psd、doc、docx、pdf、go
<li>以下文件名不支持发布:</li>
makefile、configure、test、test.php、test.html、test.txt、test.htm、test.shtm
<br/><br/>

## 4、敏感词规则
<font size=3>IHub发布前会进行敏感词检测，阻塞有法务或安全风险的业务通用敏感词和业务自定义敏感词。</font>
<li>目前业务<font color="red">通用敏感词</font>包括："最终解释权"、“永久”、“帐号”、"bootcss“、”bootcdn“，未来还会继续拓展。</li>
<li>业务自定义敏感词，敏感词可在https://zz.woa.com/v3/#/webadmin/WordManage进行管理。</li>
<br/><br/>

## 5、资源大小与类型分类
<li>放置在项目中的文件需控制在<font color="red">5M以内</font>，超过5M的音视频媒体文件可上传媒体中心以保障更好的线上体验，媒体中心地址：https://zz.woa.com/v3/#/videoadmin/list(内网)及https://ihub.qq.com/v8/#/media/center(公网)</li>
<li>5M以上的非媒体类大文件目前可上传至spm.oa.com，使用下载域名进行访问和引用。后续IHub会提供大文件管理模块。</li>
<br/><br/>

## 6、预热及报备策略
<li><font color="red">类秒杀</font>：大文件或瞬时用户访问量很大的文件请在上线前进行报备和预热以保障线上并发服务质量。</li>
<li><font color="red">新业务</font>：新业务需要报备，新业务的内容对应关系是首次上线，需要报备。</li>
<li>当前CDN的服务状态下，<font color="red">瞬时流量>50G</font>即需要进行报备。瞬时流量的计算规则为“用户访问的资源大小*瞬时访问量”，如5M*1000qps则为50G。</li>
<li>按照经验，<font color="red">建议大于5M的文件以及500W PV以上</font>的活动都进行报备。后续平台也会在项目流程上进行引导和提醒跟进。
</li>
</td></tr></table>