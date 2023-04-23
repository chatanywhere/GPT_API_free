# GPT_API_noproxy
 GPT国内可用转发API，直连无需代理。可以搭配ChatBox等软件/插件使用，极大降低接口使用成本。国内即可无限制畅快聊天。

## 特点
1. 支持Models, GPT3.5, DALLE。（GPT4将在五月份支持）
2. 支持流式答复。（即官网一样一个字一个字往外蹦）
3. 无需科学上网，国内环境直接可用
4. 价格低，相当于官方价格÷7
5. 同官网计费策略，流式问答使用tiktoken库准确计算Tokens，非流式问答直接使用官方返回Tokens用量计费。
6. 余额不会过期，永久有效。根据用户反馈30块钱个人中度使用估计能用一年。

## 如何使用
- 转发API Key购买: [佩奇GPT小店](https://peiqi.shop/)
- 转发Host: https://api.chatanywhere.cn/ 
- 备用转发Host: https://home.dduo06.cn/ (国内中转，延时更低)
- 余额和使用记录查询（通知公告也会发在这里）: [余额查询](https://api.chatanywhere.cn/)
- 转发API无法直接向官方接口api.openai.com发起请求，需要将请求地址改为api.chatanywhere.cn才可以使用，大部分插件和软件都可以修改。

## 常见软件/插件使用方法

### **ChatBox(推荐使用)**

ChatGPT开源桌面应用，支持全部桌面平台。

下载链接：https://github.com/Bin-Huang/chatbox/releases

使用方法：如图在设置中填入购买的密钥，并将代理设置为 https://api.chatanywhere.cn 或者 https://home.dduo06.cn 即可

![](images/chatbox.png)


### **浏览器插件ChatGPT Sidebar**

官网链接：https://chatgpt-sidebar.com/

安装好插件后进入设置页面，如图所示修改设置，将url修改为 https://api.chatanywhere.cn 或者 https://home.dduo06.cn 。

![](images/sidebar.png)

### **Jetbrains插件ChatGPT**
<img src="./images/jet1.png" width='200'/>

安装好插件后在Settings > Tools > OpenAI > GPT 3.5 Turbo中如图所示配置好插件，重点要将Server Settings 修改为 https://api.chatanywhere.cn/v1/chat/completions 或者 https://home.dduo06.cn/v1/chat/completions 。并勾选Customize Server。

![](images/jet2.png)


### **VSCode插件Code GPT**
<img src="./images/codegpt1.png" width='300'/>

这个插件修改Host相对麻烦一些，需要修改源码才可以使用。

1. 安装插件。安装好后按Ctrl+Shift+P，弹出框中输入Open Extensions Floder
![](images/codegpt2.png)

2. 点击Extensions: Open Extensions Floder，这将打开插件目录，找到Code GPT的文件夹。
![](images/codegpt3.png)

3. 打开后进入打开文件./src/clients/openai_client.js，搜索文件中的api.openai.com，并替换为 `api.chatanywhere.cn` 或者 `home.ddou06.cn`。保存文件。
![](images/codegpt4.png)

4. 再次回到vscode，按Ctrl+Shift+P，弹出框中输入CodeGPT: Set API KEY，点击CodeGPT: Set API KEY。然后将购买的Key输入进去即可。
![](images/codegpt5.png)

5. 以上步骤完成后，重启VSCode

- 其他VSCode插件类似。

