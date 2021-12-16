![Image text](./Starrydew.png)

* [简体中文](./README.md)

* [English](./README_en.md)

# Starrydew-Wiki
***作者：BluefishV (2719149077)***

***Bilibili: BluefishV***

***在此感谢以下所有协助我们制作Starrydew的开发者!***

***-在线安装版本: voyage27(476445136)***

***-方块色库: Sparks(2033161737)***

***-安装脚本: UCKET(3228851731)***
* StarryDew是基于JavaScript的我的世界基岩版WebSocket快速建造程序
* 如要了解更多，请加QQ群：[956856716](https://qm.qq.com/cgi-bin/qm/qr?k=vV9gN1xvavBCBQF4AWousWY-0F1vjFuM&jump_from=webapi)
---
### 基础命令
```
set pos - 保存当前坐标(执行所有导出/导入指令前必须使用 该指令以保存您的位置)

pos1 - 设置pos1为当前坐标

pos2 - 设置pos2为当前坐标

pos3 - 设置pos3为当前坐标

speed <数字:毫秒> - 设置导出的速度(默认7)

speed2 <数字:毫秒> - 设置.sd文件导入的速度
```
### 基本几何
```
circle <数字:半径> <字符串:方块 | 数字:方块id> [ 数字:特殊值] [x|y|z] - 朝向x/y/z绘制一个圆(方向不填 默认为y)

       fill <true | false> - 是否使用fill模式。true:  是，false: 否 。

pen <字符串: 方块> <数字: 特殊值> - 绘制三阶贝塞尔曲线,必须先使用set pos,pos1,pos2,pos3指令,必须在第一象限(不推荐使用)

maze <数字:长度> <数字:宽度> <数字:高度> <字符串:方块|数字:方块id> [数字:特殊值] - 用xxx特殊值的xxx方块创建一个迷宫(长度和宽度都不得小于5)

      solve - 自动解出上一次生成的迷宫

random <数字:长> <数字:高> <数字:宽> - 生成一个由随机方块组成的区域

steeple <数字:半径> <字符串:方块 | 数字:方块id> [数字: 特殊值] - 生成一座尖塔

        fill <true | false> - 设置是否使用/fill模式

sphere <数字: 半径> <字符串: 方块 | 数字: 方块id> [ 数字: 特殊值] - 生成一个球体

        fill [true/false] - 设置是否使用fill模式


```
### 导入/导出 建筑/像素画/二维码
```
sche import <字符串: 文件> - 解析并导入.schematic文件

     import <字符串: 文件> per <数字: 百分比> - 指定百分比解析并导入.schematic文件

     import <字符串: 文件> from <数字: y轴起始点> < 数字: y轴结束点> - 指定高度范围导入schematic文件

             auto <数字: 索引> - 使用readdir 指令后会显示文件索引，索引代表着相应的文件

             auto <数字: 索引> per <数字: 百分比> - 指定百分比导入文件

             speed <数字: 毫秒> - 设置schematic导入速度(默认7)

mcfunc  <字符串: 文件> - 运行.mcfunction文件中的命令

         <字符串: 文件> per <数字:百分比> - 运行.mcfunction 文件中的命令

         auto <数字: 索引> - 使用readdir 指令后会显示文件索引，索引代表着 相应的文件

         auto <数字: 索引> per <数字: 百 分比> - 指定百分比导入文件

         speed <数字: 毫秒> - 设置执行mcfunction的速度(xxx毫秒/1方块)

nbt speed <数字: 毫秒> - 设置.nbt文件的导入速度(默认7)

    import <字符串: 文件> - 解析并导入.nbt文件

    import <字符串: 文件> per <数字:百分比> -  根据百分比解析并导入.nbt文件

            auto <数字: 索引> - 使用readdir指令后会显示文件索引，索引代表着相应的文件

            auto <数字: 索引> per <数字: 百分比> -  指定百分比导入文件

pixel <字符串: 路径> - 导入一张.png图片

      auto <数字: 索引> - 根据索引导入一张png图片

      speed <数字: 速度> - 设置生成图片的速度

      follow <true | false> - 是否自动跟随

      color_pixel <true | false> - 是否使用彩色像素画模式
      
      multi_thread <true | false> - 是否启用多线程模式

export <坐标x增加值> <坐标y增加值> <坐标z增加值> <字符串:文件名> - 导出指定大小的区域

        auto <字符串: 文件名> - 根据set pos, pos1 ,pos2自动计算导出大小(set pos必须在建筑的左上角(对应建筑所有顶点x，y，z坐标 都会增加的位置),pos1,pos2必须位于建筑的对角线)

readdir - 读取./buildings/路径下的所有文件并显示到聊天栏并显示文件索引

tomcfunc <字符串: 文件> - 将.sd文件转化为.mcfunction文 件

qr <字符串: 内容> - 生成含有该内容的二维码

   speed <数字: 速度> - 设置生成二维码的速度



```
### 其他命令
```
about - 关于

version - 版本

help [数字: 页面] - 查看帮助

eval <字符串: js代码> - 控制台执行javascript代码(调试)

time - 显示当前时间

run <字符串:指令> - 在控制台执行指令并将结果返回到游戏中

times <数字:方块数> - 在自动执行各种导出/导入指令时title的提示速度( 每xxx 方块title一次，默认为20，推荐设置为20)

       import <字符串:文件> - 导入./buildings/ 路径下 的.sd文件

       auto [数字: 索引] - 使用readdir指令后会显示文件索引，索引代表着相应的文件

title content <字符串: 内容> - 设置title的内容

     colors <字符串: 颜色> - 设置颜色，每个颜色使用%分割( 例如title colors color1%color2%color3...)

     players <字符串: 玩家> - 设置显示的玩 家( 可 以是玩家名,@a,@s,@p,@r等， 可以使用选择器)

     model <字符串: 模式> - 设置title的模式，可以 是title,actionbar等

     start <数字: 毫秒> - 每xxx毫秒刷新并显示一次title

     stop - 停止显示

home add <字符串: 家的名称> <here | x y z> - 设置当前坐标为家

       remove <字符串: 家> - 删除一个家

       index <数字: 索引> - 根据数组索引删除一个家(索引使用home list查看)

       go <字符串: 家> - 传送至一个家

       index <数字: 索引> - 根据数组索引传送到一个家

       list - 显示所有的家

       rename <字符串: 旧名称> <字符串: 新名称> - 重命名一个家

       setpos <字符串: 家> <x y z> - 重新设置家的坐标

       private <true | false> 设置显示权限(true:仅自己可见 false: 全部玩家可见)

       save - 自动保存所有家到磁盘(路径为./data/homes)

       load - 自动读取磁盘上的家(路径为./data/homes)

fastench - 快速附魔手中的物品

guess start [数字: 起始范围] [数字: 终止范围] - 设置猜数字游戏的数字生成范围

       <数字: 猜的数字> - 猜数字

       stop - 结束猜数字游戏

wne start [数字: 速度] - 显示当前坐标

     stop - 停止显示

getloc <字符串: 类型> [字符串: 名字]: 在没有op权限的情况下获取任意实体的坐标

       range <数字: 起始点的x坐标> <数字: 起始点的z坐标> < 数字:结束点的x坐标> <数字: 结束点的z坐标>: 设置范围.

       accuracy <数字: 精度>: 设置精度.

set <数字:方块id|字符串:方块名称> [数字: 方块特殊值] [字符串: 其他] - 将pos1和pos2选定的区域fill为指定方块

    undo - 撤销本次的操作

replace <方块ID:特殊值 | 方块ID | 方块名:特殊值 | 方块 名> <方块ID:特殊值 | 方块ID | 方块名:特殊值 | 方块名> - 将pos1 和pos2选定的区域内的一种方块替换成另一种方块

        undo - 撤销本次的操作

clone [字符串: 其他属性] - 将pos1和pos2选定的区域复制到pos3,例:"clone masked move" = "/clone pos1 pos2 pos3 masked move","clone"="/clone pos1 pos2 pos3".

swc help - 查看世界聊天帮助
```
### 控制台命令
```
控制台指令:
    swc help: 查看世界聊天帮助
```
***控制台指令目前仅支持世界聊天命令和mc原版指令.***

### 配置文件
```
	server_port: 端口号
       
	colorPixelThreadCount: 彩色像素画解析线程数(若已启用多线程)
       
	custom_cmd: 是否启用自定义指令(自定义指令配置文件路径: ./data/custom_cmd.json)
       
	customcmd_remind_before_running_mcfunc: 是否在执行自定义指令的function文件时提示
       
	log_time: 是否记录消息时间
       
	write_log_on_disk: 是否将控制台消息自动写入到磁盘中(路径./data/logs/)
       
	guessNumberCommand: 是否启用猜数字指令
       
	language: 语言
       
	pixel_tp_every_xxx_cmds: 导入png图片时的传送速度(若允许自动跟随)
       
	use_cmd_in_console: 是否启用控制台命令
       
	log_in_game_when_run_cmd_in_console: 控制台命令是否反馈给连接ws的玩家
       
	enable_worldchat: 是否启用世界聊天
       
	worldchat_address: 世界聊天的服务器地址
       
	enableNewPixelAlgorithm: 是否启用新的彩色像素画算法
       
	defaultFilePath: 默认路径
       
	colorText: 是否使用彩色文字
       
	particle_tip: 是否启用粒子提示效果(导出时的粒子提示, 若造成卡顿请勿开启)
       
	enableFastCommand: 是否启用快速指令(快速指令文件路径: ./data/FastCommand.json)
       
	default: 一些默认值
       
custom_cmd.json文件:

	文件内部有说明，请使用文本打开该文件
```

