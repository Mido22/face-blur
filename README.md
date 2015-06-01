face-blur
=========

###Use case: 

user wants to hides his background while doing a video-chat with others.

### Current System:

We detect the face of the user, then use canvas to show the video and hide the actual video, there are many ways of blurring a picture, I did the most basic version which would make background appear bad but had very good performance. The problem with this method is, the other side still get's the raw video, so anybody with basic understanding of HTML5 can access the raw video. One solution might be use kurento-server and use custom filter, would add it here once it is completed.
