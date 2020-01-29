import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video.model';
import { VideoService } from '../services/video.service';
import { NgForm } from '@angular/forms';

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
  //keep_id: string = "";

  constructor( private videoService: VideoService ) { }

  ngOnInit() {

    this.videoService.observed_videos.subscribe(() => {
      this.video = this.videoService.getDispVid();
      //this.keep_id = this.video._id;
      //console.log('video-detail ngOnInit() id is: ' + this.keep_id);
      this.isNewVid = false;
    });
  }

  updateOrSave() {
    this.update = !this.update;
    
    // if it said CANCEL & pressed CANCEL
    if(!this.update){
      this.btnName = "UPDATE";
      this.video = null;                //This is was recently changed 1/24 11:11 AM
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

  onSubmitVideo(form: NgForm) {
    
    if(form.value.invalid) return;

    let newOrEditVideo = new Video();
    newOrEditVideo.title = form.value.title;
    newOrEditVideo.url = form.value.url;
    newOrEditVideo.description = form.value.description;
    
    if (this.isNewVid) {
      this.videoService.createVideo(newOrEditVideo);
      this.updateOrSave();
    } else {
      newOrEditVideo._id = this.video._id;
      //console.log("from video-detail onSubmitVideo() component Keep_id is: " + this.keep_id);
      console.log("from video-detail onSubmitVideo() component id is: " + newOrEditVideo._id);
      this.videoService.updateVideo(newOrEditVideo);
      this.updateOrSave();                            //uncomment this ....................
    }
  }

  onDelete(id: string) {
    this.videoService.deleteVideo(id);
    this.updateOrSave();
  }

}
