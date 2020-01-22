import { Video } from "../models/video.model";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VideoService {
    observed_videos = new Subject<Video[]>();
    videos: Video [] = [];
    // [
    //     { title: 'Title 1', url: 'poiupoiu', description: 'Title 1 content here...' },
    //     { title: 'Title 2', url: 'poiupoiu', description: 'Title 2 content here...' },
    //     { title: 'Title 3', url: 'poiupoiu', description: 'Title 3 content here...' },
    // ];
    private selectedVideoIndex: number;
    _getUrl = "http://localhost:3000/videos";

    constructor( private http: HttpClient ) {}

    // READ READ READ READ
    setDispVid(index: number) {
        this.selectedVideoIndex = index;
        this.observed_videos.next(this.videos);     // comment this out?????
    }

    getDispVid() {
        return this.videos[this.selectedVideoIndex];
    }
    getVideos() {
        return this.http.get<Video[]>(this._getUrl).subscribe((res) => {
            this.videos = res;
            this.observed_videos.next(this.videos);
        });
        //return this.videos;
    }

    updatedListner() {
        return this.observed_videos.asObservable();
    }

    // CREATE CREATE CREATE CREATE
    createVideo(video: Video) {
        this.videos.push(video);
    }

    // UPDATE UPDATE UPDATE UPDATE

    // DELETE DELETE DELETE DELETE
    deleteVideo(video: Video) {
        for (let i = 0; i < this.videos.length; i++) {
            if (video.title.toString == this.videos[i].title.toString) {
                this.videos.splice(i, 1);
            }
        }
    }
}