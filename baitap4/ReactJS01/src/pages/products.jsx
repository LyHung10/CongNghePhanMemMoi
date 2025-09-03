import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Spin } from "antd";
import axios from "../utils/axios.customize";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([{ _id: "", name: "Tất cả" }]);
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState("");

    // Phân trang
    const [page, setPage] = useState(1);
    const limit = 1;
    const [hasMore, setHasMore] = useState(true);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get("/v1/category");
            if (res && Array.isArray(res)) {
                setCategories([{ _id: "", name: "Tất cả" }, ...res]);
            } else if (res && Array.isArray(res.data)) {
                setCategories([{ _id: "", name: "Tất cả" }, ...res.data]);
            }
        } catch (err) {
            console.error("Lỗi fetch categories:", err);
        }
    };

    // Fetch products
    const fetchProducts = async (reset = false) => {
        try {
            setLoading(true);
            let url = `/v1/product?page=${page}&limit=${limit}`;
            if (categoryId) {
                url += `&categoryId=${categoryId}`;
            }
            const res = await axios.get(url);

            if (res && Array.isArray(res.data)) {
                if (reset) {
                    setProducts(res.data);
                } else {
                    setProducts((prev) => [...prev, ...res.data]);
                }
                setHasMore(res.data.length === limit);
            }
        } catch (err) {
            console.error("Lỗi fetch products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Load khi đổi category
    useEffect(() => {
        setPage(1);
        fetchProducts(true); // reset về trang 1
    }, [categoryId]);

    // Load khi đổi page (bấm nút xem thêm)
    useEffect(() => {
        if (page > 1) fetchProducts();
    }, [page]);

    return (
        <div style={{ padding: 20 }}>
            <h2>Danh sách sản phẩm</h2>

            {/* Filter categories */}
            <div style={{ marginBottom: 20 }}>
                {categories.map((c) => (
                    <Button
                        key={c._id || "all"}
                        type={categoryId === c._id ? "primary" : "default"}
                        onClick={() => setCategoryId(c._id)}
                        style={{ marginRight: 10, marginBottom: 10 }}
                    >
                        {c.name}
                    </Button>
                ))}
            </div>

            {/* Grid sản phẩm */}
            <Row gutter={[16, 16]}>
                {products.map((p) => (
                    <Col key={p._id} xs={24} sm={12} md={8} lg={6}>
                        <Card hoverable cover={<img alt={p.name} src={p.imageUrl} />}>
                            <Card.Meta title={p.name} description={`${p.price} VNĐ`} />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Loading */}
            {loading && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Spin />
                </div>
            )}

            {/* Nút Xem thêm */}
            {!loading && hasMore && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Button type="primary" onClick={() => setPage((prev) => prev + 1)}>
                        Xem thêm
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
