import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { BlogArticle } from "@/components/ui/blog-article";
import { RichBlogArticle } from "@/components/ui/rich-blog-article";
import { EmailSubscription } from "@/components/ui/email-subscription";
import { LocationTimeDisplay } from "@/components/ui/location-time-display";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NotificationStatus } from "@/components/ui/notification-status";
import { useState, useRef, useEffect } from "react";
import { blogManager } from "@/lib/blogManager";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Web Applications with MERN Stack",
    content: "In today's rapidly evolving digital landscape, building scalable web applications has become a cornerstone of successful software development. The MERN stack (MongoDB, Express.js, React, and Node.js) represents a powerful combination of technologies that enables developers to create robust, full-stack applications with JavaScript as the primary language.\n\nMongoDB serves as our document-based database, offering flexibility in data modeling and excellent scalability options. Its JSON-like document structure aligns perfectly with JavaScript objects, making data manipulation intuitive for developers. When designing your database schema, consider implementing proper indexing strategies and data normalization techniques to ensure optimal performance as your application grows.\n\nExpress.js acts as our server-side framework, providing a minimalist yet flexible foundation for building RESTful APIs. Implement proper middleware for authentication, error handling, and request validation. Consider using tools like Helmet for security headers and Morgan for logging to enhance your application's robustness.\n\nReact, our frontend library, enables the creation of dynamic and interactive user interfaces. Implement component-based architecture, utilize hooks for state management, and consider performance optimization techniques like memoization and code splitting. For larger applications, consider state management solutions like Redux or Context API.\n\nNode.js powers our server-side runtime, enabling JavaScript execution outside the browser. Leverage its non-blocking I/O model for handling concurrent requests efficiently. Implement proper error handling, use clustering for multi-core systems, and consider implementing caching strategies for improved performance.",
    excerpt: "Learn how to create robust and scalable web applications using MongoDB, Express.js, React, and Node.js with best practices and performance optimization techniques.",
    date: "2024-12-15",
    readTime: "8 min read",
    author: "Dinesh Priyantha",
    tags: ["React", "Node.js", "MongoDB", "Web Development"],
    likes: 42,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
  },
  {
    id: 2,
    title: "AI/ML Integration in Modern Web Development",
    content: "Artificial Intelligence and Machine Learning are revolutionizing the way we approach web development, offering unprecedented opportunities to enhance user experiences and automate complex processes. This comprehensive guide explores practical implementation strategies for integrating AI/ML capabilities into modern web applications.\n\nMachine Learning models can be integrated into web applications through various approaches. Client-side integration using TensorFlow.js allows for real-time inference without server round-trips, providing immediate responses for tasks like image classification or natural language processing. Server-side integration offers more computational power and enables the use of larger, more sophisticated models.\n\nNatural Language Processing (NLP) capabilities can transform user interactions through chatbots, sentiment analysis, and content generation. Implement pre-trained models for common tasks or train custom models for domain-specific requirements. Consider using services like OpenAI's API for advanced language understanding capabilities.\n\nComputer Vision applications in web development include image recognition, object detection, and visual search capabilities. Implement features like automatic image tagging, content moderation, and augmented reality experiences. Use pre-trained models from TensorFlow Hub or train custom models using your specific dataset.\n\nPersonalization engines powered by machine learning can significantly improve user engagement by delivering relevant content and recommendations. Implement collaborative filtering, content-based filtering, or hybrid approaches based on user behavior data and preferences.",
    excerpt: "Exploring how artificial intelligence and machine learning can enhance user experiences in web applications with practical implementation examples.",
    date: "2024-12-10",
    readTime: "12 min read",
    author: "Dinesh Priyantha",
    tags: ["AI/ML", "Python", "TensorFlow", "Web Development"],
    likes: 67,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "DevOps Best Practices with Docker and Kubernetes",
    content: "Modern software development demands robust DevOps practices to ensure reliable, scalable, and maintainable applications. Docker and Kubernetes have emerged as essential tools in the DevOps toolkit, enabling containerization and orchestration at scale.\n\nDocker containerization provides consistency across development, testing, and production environments. Create optimized Dockerfiles using multi-stage builds to reduce image size and improve security. Implement proper layer caching strategies and use alpine-based images where appropriate. Establish security scanning practices using tools like Trivy or Clair to identify vulnerabilities in your container images.\n\nKubernetes orchestration enables automated deployment, scaling, and management of containerized applications. Design your applications following the twelve-factor app methodology to ensure cloud-native compatibility. Implement proper resource limits and requests, configure health checks, and use namespace isolation for multi-tenancy.\n\nCI/CD pipelines integrate seamlessly with containerized applications, enabling automated testing, building, and deployment processes. Use GitLab CI, GitHub Actions, or Jenkins to create robust pipelines that include code quality checks, security scanning, and automated testing. Implement blue-green or canary deployment strategies for zero-downtime deployments.\n\nMonitoring and observability are crucial for maintaining production systems. Implement comprehensive logging using structured formats, set up metrics collection with Prometheus, and create dashboards using Grafana. Use distributed tracing tools like Jaeger to understand request flows in microservices architectures.",
    excerpt: "A comprehensive guide to implementing DevOps practices using containerization and orchestration tools for scalable application deployment.",
    date: "2024-12-05",
    readTime: "15 min read",
    author: "Dinesh Priyantha",
    tags: ["DevOps", "Docker", "Kubernetes", "AWS"],
    likes: 89,
    image: "https://images.unsplash.com/photo-1605732562742-3023a888e56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: 4,
    title: "Cloud Computing with AWS: From Basics to Advanced",
    content: "Amazon Web Services (AWS) has revolutionized how organizations deploy, scale, and manage their applications in the cloud. This comprehensive guide covers essential AWS services and advanced architectural patterns for building resilient, scalable applications.\n\nEC2 (Elastic Compute Cloud) provides scalable virtual servers in the cloud. Choose appropriate instance types based on your workload requirements, implement auto-scaling groups for dynamic capacity management, and use spot instances for cost optimization. Configure proper security groups and network ACLs to control traffic flow.\n\nS3 (Simple Storage Service) offers virtually unlimited object storage with multiple storage classes for different use cases. Implement lifecycle policies to automatically transition objects between storage classes, use versioning for data protection, and configure cross-region replication for disaster recovery. Implement proper IAM policies to control access to your S3 resources.\n\nRDS (Relational Database Service) provides managed database solutions with automated backups, patching, and scaling capabilities. Choose between MySQL, PostgreSQL, Oracle, or SQL Server based on your requirements. Implement read replicas for improved read performance and configure Multi-AZ deployments for high availability.\n\nLambda serverless computing enables event-driven architectures without server management overhead. Design functions following best practices for cold start optimization, implement proper error handling and retry logic, and use environment variables for configuration management. Integrate with other AWS services using event sources and destinations.",
    excerpt: "Master cloud computing concepts and learn to deploy scalable applications on Amazon Web Services with practical examples and best practices.",
    date: "2024-11-28",
    readTime: "20 min read",
    author: "Dinesh Priyantha",
    tags: ["AWS", "Cloud Computing", "EC2", "S3"],
    likes: 124,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
  }
];

const BlogPageWithSlider = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Load dynamic blog posts from blog manager
  useEffect(() => {
    const posts = blogManager.getAllBlogs();
    setDynamicPosts(posts);
  }, []);

  // Combine static and dynamic posts
  const allPosts = [...dynamicPosts, ...blogPosts];

  // Get all unique tags from both static and dynamic posts
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags)));

  // Filter posts based on search and tags
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const togglePostExpansion = (postId: number) => {
    setExpandedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const navigateToPost = (postId: number) => {
    setSelectedPost(postId);
    const element = document.getElementById(`post-${postId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      
      {/* Header with Navigation */}
      <div className="relative z-10">
        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-blue-500 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Portfolio</span>
              </Link>
              <div className="flex items-center space-x-4">
                <LocationTimeDisplay />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Technical <span className="text-blue-500">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Exploring modern software development, cloud technologies, and best practices
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Navigation Slider */}
        <section className="py-8 bg-accent/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Featured Articles</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="professional-card"
                    onClick={() => scrollSlider('left')}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="professional-card"
                    onClick={() => scrollSlider('right')}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div 
                ref={sliderRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {allPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    className="flex-shrink-0 w-80 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigateToPost(post.id)}
                  >
                    <div className={`professional-card p-4 h-full ${selectedPost === post.id ? 'ring-2 ring-blue-500' : ''}`}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 professional-card"
                    />
                  </div>
                  <Button variant="outline" className="professional-card">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Tags Filter */}
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer transition-all duration-200 hover:scale-105"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Blog Articles */}
              <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    id={`post-${post.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <RichBlogArticle
                      post={post}
                      isExpanded={expandedPosts.includes(post.id)}
                      onToggleExpand={() => togglePostExpansion(post.id)}
                    />
                  </motion.div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-4">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or selected tags.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <EmailSubscription />
              </motion.div>


              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="professional-card p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline"
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="professional-card p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">About the Author</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Full-stack developer passionate about modern web technologies, 
                  AI/ML integration, and DevOps practices. Currently pursuing 
                  Computing and Information Systems at Sabaragamuwa University.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageWithSlider;
