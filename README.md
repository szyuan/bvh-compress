# BVH文件压缩工具 - BVH File Compression Tool

> BVH文件的全称是“Biovision Hierarchy Animation File”，是一种三维动画文件格式。它通常用于在计算机图形学和动画领域中存储由骨骼动画组成的序列帧数据，包括人物、动物和机器人等。具体而言，BVH文件以层次结构的形式描述了人体或物体的运动轨迹，用于创建现实动态场景，比如电视、电影和游戏等。BVH文件一般由动态捕捉设备产生，并且可以被多种3D建模软件解析和编辑。

> A BVH file, short for "Biovision Hierarchy Animation File," is a type of 3D animation file format typically used for storing sequences of skeletal animation data in computer graphics and animation fields, including human, animal, and robot subjects. Specifically, the BVH file describes the motion trajectories of a human body or an object in a hierarchical structure, used to create realistic dynamic scenes such as TV, movies, and games. BVH files are generally generated by motion capture devices and can be parsed and edited by various 3D modeling software.


基于Node.js，通过抽取BVH文件内帧数据的方式进行简单压缩，可以设定压缩后的质量。

Based on Node.js, this tool uses frame data extraction to achieve simple compression of BVH files. Quality after compression can be set.

安装后可以简单用一行命令执行压缩。

After installation, you can simply execute the compression with a single command line.

## 安装 Install
```
npm i -g bvh-compress
```

## 使用 Usage
```
bvn-compress [sourceFile] [quality] [destFile]

bvn-compress motion.bvh 0.8 new.bvh

bvn-compress motion.bvh (default quality: 0.5) (default destFile: out.bvh)
```