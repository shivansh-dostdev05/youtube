export interface Video{
  id: string;
  
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
      };
        medium: {
            url: string;
        };
        high: {
            url: string;
        };
    };
    };

    statistics: {
        viewCount: string;
        likeCount: string;
        commentCount: string;
    };

    contentDetails: {
        duration: string;
    };
  }

  export interface SearchResponse {
    videos: Video[];
    nextPageToken: string;
  }

  export interface TrendingVideoResponse {
    videos: Video[];
  }