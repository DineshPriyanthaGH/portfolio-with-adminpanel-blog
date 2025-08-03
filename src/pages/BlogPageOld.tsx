import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { BlogArticle } from "@/components/ui/blog-article";
import { EmailSubscription } from "@/components/ui/email-subscription";
import { LocationTimeDisplay } from "@/components/ui/location-time-display";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";

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
    image: "/api/placeholder/600/300"
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
    image: "/api/placeholder/600/300"
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
    image: "/api/placeholder/600/300"
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
    image: "/api/placeholder/600/300"
  },
  {
    id: 5,
    title: "The Future of Full-Stack Development",
    description: "Insights into emerging trends and technologies that are shaping the future of full-stack development.",
    date: "2024-11-20",
    readTime: "10 min read",
    author: "Dinesh Priyantha",
    tags: ["Full-Stack", "Trends", "Technology", "Future"],
    image: "/api/placeholder/600/300"
  },
  {
    id: 6,
    title: "Building Responsive UIs with Tailwind CSS",
    description: "Learn how to create beautiful and responsive user interfaces using the utility-first CSS framework.",
    date: "2024-11-15",
    readTime: "6 min read",
    author: "Dinesh Priyantha",
    tags: ["CSS", "Tailwind", "UI/UX", "Frontend"],
    image: "/api/placeholder/600/300"
  }
];

const Newsletter = () => (
  <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Stay Updated</CardTitle>
      <CardDescription className="text-blue-100">
        Get the latest insights on web development, AI/ML, and tech trends delivered to your inbox.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
          Subscribe
        </Button>
      </div>
    </CardContent>
  </Card>
);

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Portfolio
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tech Blog</h1>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Tech <span className="text-yellow-400">Insights</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Exploring the latest in web development, AI/ML, and cloud technologies
              </p>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Newsletter />
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Articles</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover insights, tutorials, and thoughts on modern software development
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg"></div>
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-3">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400">
              © 2025 Dinesh Priyantha. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPage;
