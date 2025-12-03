const videos = [
  {
    id: "1",
    title: "React Tutorial for Beginners",
    thumbnailUrl: "https://picsum.photos/seed/react1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    channelName: "Code Academy",
    views: "120K views",
    uploadDate: "2024-10-12",
    likes: 3200,
    dislikes: 120,
    description: "This is a beginner-friendly React tutorial covering hooks and components.",
    category: "Education",
    comments: [
      { id: "c1", user: "Maya Singh", text: "Super helpful explanation!", date: "2024-11-10" },
      { id: "c2", user: "Aarav", text: "Thanks for this tutorial!", date: "2024-11-11" }
    ]
  },

  {
    id: "2",
    title: "Top 10 Gaming Moments of 2024",
    thumbnailUrl: "https://picsum.photos/seed/gaming1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    channelName: "GamerZone",
    views: "89K views",
    uploadDate: "2024-09-22",
    likes: 2100,
    dislikes: 45,
    description: "A compilation of the most insane gaming highlights of the year.",
    category: "Gaming",
    comments: [
      { id: "c3", user: "Farhan", text: "Bro that last clip was insane!", date: "2024-10-01" }
    ]
  },

  {
    id: "3",
    title: "Node.js Crash Course",
    thumbnailUrl: "https://picsum.photos/seed/node1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    channelName: "Backend Mastery",
    views: "75K views",
    uploadDate: "2024-08-10",
    likes: 1400,
    dislikes: 22,
    description: "Learn Node.js from scratch with real-world examples and APIs.",
    category: "Software",
    comments: []
  },

  {
    id: "4",
    title: "CSS Grid vs Flexbox",
    thumbnailUrl: "https://picsum.photos/seed/css1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    channelName: "Frontend World",
    views: "62K views",
    uploadDate: "2024-10-01",
    likes: 980,
    dislikes: 18,
    description: "A complete comparison of CSS Grid and Flexbox with examples.",
    category: "Education",
    comments: [
      { id: "c4", user: "Riya", text: "Finally someone explained it simply!", date: "2024-10-12" }
    ]
  },

  {
    id: "5",
    title: "Understanding JavaScript Closures",
    thumbnailUrl: "https://picsum.photos/seed/js1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    channelName: "JS Academy",
    views: "140K views",
    uploadDate: "2024-09-12",
    likes: 5200,
    dislikes: 80,
    description: "A deep dive into closures, lexical scope, and the JavaScript runtime.",
    category: "Education",
    comments: []
  },

  {
    id: "6",
    title: "AI Tools Every Developer Should Use",
    thumbnailUrl: "https://picsum.photos/seed/ai1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    channelName: "FutureTech",
    views: "220K views",
    uploadDate: "2024-11-01",
    likes: 6400,
    dislikes: 120,
    description: "A showcase of AI tools that boost productivity and coding efficiency.",
    category: "Technology",
    comments: [
      { id: "c5", user: "Sam", text: "This saved me hours of work!", date: "2024-11-05" }
    ]
  },

  {
    id: "7",
    title: "How CPUs Actually Work",
    thumbnailUrl: "https://picsum.photos/seed/cpu1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    channelName: "Tech Explained",
    views: "180K views",
    uploadDate: "2024-07-18",
    likes: 4100,
    dislikes: 60,
    description: "A simple explanation of how processors execute instructions.",
    category: "Technology",
    comments: []
  },

  {
    id: "8",
    title: "Gaming Setup Tour 2024",
    thumbnailUrl: "https://picsum.photos/seed/setup1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    channelName: "GamerZone",
    views: "95K views",
    uploadDate: "2024-08-30",
    likes: 1500,
    dislikes: 32,
    description: "A look inside a high-end gaming setup with RGB lighting and accessories.",
    category: "Gaming",
    comments: []
  },

  {
    id: "9",
    title: "Build a Portfolio Website in 20 Minutes",
    thumbnailUrl: "https://picsum.photos/seed/portfolio1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    channelName: "Web Dev Pro",
    views: "130K views",
    uploadDate: "2024-09-03",
    likes: 3500,
    dislikes: 55,
    description: "A fast and efficient tutorial to build a modern portfolio website.",
    category: "Software",
    comments: []
  },

  {
    id: "10",
    title: "Dark Mode UI Design Tips",
    thumbnailUrl: "https://picsum.photos/seed/dark1/640/360",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    channelName: "Design Daily",
    views: "54K views",
    uploadDate: "2024-10-05",
    likes: 780,
    dislikes: 12,
    description: "Learn key principles when designing dark mode user interfaces.",
    category: "Design",
    comments: []
  }
];

export default videos;
