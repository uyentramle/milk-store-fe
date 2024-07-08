
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { FaHeart, FaShareAlt, FaComment, } from 'react-icons/fa';

const BlogPage = () => {
    const Blog = [
        {
            id: 1,
            image: "https://www.shutterstock.com/image-photo/happy-curly-millennial-indian-man-600nw-2140413095.jpg",
            name: "Blog  1 ",
            title: "What you know about",
            author: "Mr.Milk",
            Date: "11/4"

        },
        {
            id: 2,
            image: "https://www.shutterstock.com/image-photo/happy-curly-millennial-indian-man-600nw-2140413095.jpg",
            name: "Introduction to the Basics",
            title: "Understanding the Essentials",
            author: "Author X",
            Date: "April 11th"
        },
        {
            id: 3,
            image: "https://www.shutterstock.com/image-photo/happy-curly-millennial-indian-man-600nw-2140413095.jpg",
            name: "Advanced Techniques in",
            title: "Exploring the Depths of",
            author: "Ms. Expert",
            Date: "2023-06-18"
        },
        {
            id: 4,
            image: "https://www.shutterstock.com/image-photo/happy-curly-millennial-indian-man-600nw-2140413095.jpg",
            name: "Mastering",
            title: "Unraveling the Mysteries of",
            author: "Professor Wisdom",
            Date: "Current Date"
        },
        {
            id: 5,
            image: "https://cdn1.concung.com/2022/03/44602-84158-large_mobile/vinamilk-yoko-gold-2-1-2-tuoi-850g.png",
            name: "Blog  1 ",
            title: "What you know about",
            author: "Mr.Milk",
            Date: "11/4"
        },
        {
            id: 6,
            image: "https://cdn1.concung.com/2022/05/57282-88158-large_mobile/vinamilk-optimum-gold-2-800g.png",
            name: "Blog  1 ",
            title: "What you know about",
            author: "Mr.Milk",
            Date: "11/4"
        },
        {
            id: 7,
            image: "https://cdn1.concung.com/2022/05/57286-88164-large_mobile/vinamilk-optimum-gold-3-850g-1-2-tuoi.png",
            name: "Blog  1 ",
            title: "What you know about",
            author: "Mr.Milk",
            Date: "11/4"
        },
        {
            id: 8,
            image: "https://cdn1.concung.com/2024/04/44603-1714120962-trans.png",
            name: "Blog  1 ",
            title: "What you know about",
            author: "Mr.Milk",
            Date: "11/4"
        },
    ];
    return (
        <div className="min-h-screen flex flex-col">
            <Banner />
            <div className="flex flex-1">
                <Sidebar />
                <section className="container mx-auto m-4" style={{ marginTop: '10px' }}>
                    <Row gutter={[16, 16]} >
                        {Blog.map((blog) => (
                            <Col key={blog.id} xs={24} sm={12} md={8} lg={6}>

                                <Link to="/blog-detail">
                                    <Card
                                        hoverable
                                        cover={<img alt={blog.name} src={blog.image} className='p-4' style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '23px' }} />}
                                    >

                                        <div style={{ display: 'flex' }}>
                                            <FaHeart style={{ marginRight: '10px' }} />
                                            <FaShareAlt style={{ marginRight: '10px', justifyContent: 'center' }} />
                                            <FaComment />
                                        </div>
                                        <Card.Meta
                                            title={<h1 className="hover:text-green-800">{blog.name}</h1>}
                                            description={
                                                <div>
                                                    <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img
                                                            src={blog.image} // Assuming you want to use the same image, change this as needed
                                                            alt="Author"
                                                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                                        />
                                                        <div className="font-medium dark:text-black">

                                                            <span style={{ marginLeft: '10px', display: 'block', fontSize:'13px'}} className="text-sm text-gray-500 dark:text-blacks-400">{blog.author}</span>
                                                            <span style={{ marginLeft: '10px', display: 'block', fontSize:'10px' }} className="text-sm text-gray-500 dark:text-gray-400">{blog.Date}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            }
                                        />
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </section>
            </div>
        </div>

    );
};

export default BlogPage;