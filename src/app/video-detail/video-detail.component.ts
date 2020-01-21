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

  constructor( private videoService: VideoService ) { }

  ngOnInit() {

    this.videoService.observed_videos.subscribe(() => {
      this.video = this.videoService.getDispVid();
    });
  }

}
