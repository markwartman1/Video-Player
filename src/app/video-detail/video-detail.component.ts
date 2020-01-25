import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video.model';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  video: Video;
  update: boolean = false;
  btnName: string = "UPDATE";
  isNewVid: boolean;
  keep_id: string = "";

  constructor( private videoService: VideoService ) { }

  ngOnInit() {

    this.videoService.observed_videos.subscribe(() => {
      this.video = this.videoService.getDispVid();
      this.keep_id = this.video._id;
      console.log('video-detail ngOnInit() id is: ' + this.keep_id);
      this.isNewVid = false;
    });
  }

  updateOrSave() {
    this.update = !this.update;
    
    // if it said CANCEL & pressed CANCEL
    if(!this.update){
      this.btnName = "UPDATE";
      //this.video = null;                This is was recently changed 1/24 11:11 AM
    }else {
      this.btnName = "CANCEL";
    }
  }

  onAddNewVideo() {
    this.video = {
      _id: "",
      title: "",
      url: "",
      description: ""
    }
    this.isNewVid = true;
    this.updateOrSave();
  }

  onSubmitVideo(video: Video) {
    
    
    if (this.isNewVid) {
      this.videoService.createVideo(video);
      this.updateOrSave();
    } else {
      this.video._id = this.keep_id;
      console.log("from video-detail onSubmitVideo() component Keep_id is: " + this.keep_id);
      console.log("from video-detail onSubmitVideo() component id is: " + this.video._id);
      this.videoService.updateVideo(video);
      //this.updateOrSave();                            uncomment this ....................
    }
  }

  onDelete(video: Video) {
    this.videoService.deleteVideo(video);
    this.updateOrSave();
  }

}
