import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Video } from "../models/video.model";
import { VideoService } from "../services/video.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {

  videos: Video[] = [];
  private videoSubscription: Subscription

  constructor( public videoService: VideoService ) { }

  ngOnInit() {
    //this.videos = this.videoService.getVideos();
    this.videoService.getVideos();
    this.videoSubscription = this.videoService.updatedListner()
      .subscribe((vids: Video[]) => {
        this.videos = vids;
      });
  }

  ngOnDestroy() {
    this.videoSubscription.unsubscribe();
  }

  onSelectDetail(index: number) {
    this.videoService.setDispVid(index);
  }

}
