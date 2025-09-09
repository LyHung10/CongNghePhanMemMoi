import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Spin } from "antd";
import axios from "../utils/axios.customize";
import { Input, Slider } from "antd";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([{ _id: "", name: "Tất cả" }]);
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const { Search } = Input;
    const [searchText, setSearchText] = useState("");
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [discount, setDiscount] = useState(null);
    const [minViews, setMinViews] = useState(null);

    const [mode, setMode] = useState("all"); // "all" | "search"

    // Phân trang
    const [page, setPage] = useState(1);
    const limit = 4;
    const [hasMore, setHasMore] = useState(true);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get("/v1/category");
            if (res && Array.isArray(res)) {
                setCategories([{ _id: "", name: "Tất cả" }, ...res]);
            } else if (res && Array.isArray(res)) {
                setCategories([{ _id: "", name: "Tất cả" }, ...res]);
            }
        } catch (err) {
            console.error("Lỗi fetch categories:", err);
        }
    };



    //Fuzzy search
    const handleSearch = async (value) => {
        setSearchText(value);

        if (!value) {
            // quay về mode all
            setMode("all");
            setPage(1);
            fetchData(true);
            return;
        }

        try {
            setLoading(true);
            setMode("search"); // bật chế độ search
            const url = `/v1/product/search?q=${value}`;
            console.log("API search full:", `${axios.defaults.baseURL}${url}`);
            const res = await axios.get(url);

            if (res && Array.isArray(res)) {
                setProducts(res);
                setHasMore(false); // tắt nút "xem thêm"
            }
        } catch (err) {
            console.error("Lỗi search:", err);
        } finally {
            setLoading(false);
        }
    };


    // // Fetch products (chỉ chạy khi mode = all)
    // const fetchProducts = async (reset = false) => {
    //     if (mode !== "all") return; // tránh bị ghi đè kết quả search
    //     try {
    //         setLoading(true);
    //         let url = `/v1/product?page=${page}&limit=${limit}`;
    //         if (categoryId) {
    //             url += `&categoryId=${categoryId}`;
    //         }

    //         console.log("API fetch:", `${axios.defaults.baseURL}${url}`);
    //         const res = await axios.get(url);

    //         if (res && Array.isArray(res.data)) {
    //             if (reset) {
    //                 setProducts(res.data);
    //             } else {
    //                 setProducts((prev) => [...prev, ...res.data]);
    //             }
    //             setHasMore(res.data.length === limit);
    //         }
    //     } catch (err) {
    //         console.error("Lỗi fetch products:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // const fetchFilteredProducts = async () => {
    //     try {
    //         setLoading(true);
    //         let url = `/v1/product/filter?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
    //         if (categoryId) url += `&categoryId=${categoryId}`;
    //         if (discount) url += `&discount=${discount}`;
    //         if (minViews) url += `&minViews=${minViews}`;

    //         console.log("API filter:", `${axios.defaults.baseURL}${url}`);
    //         const res = await axios.get(url);

    //         if (res && Array.isArray(res.data)) {
    //             setProducts(res.data);
    //             setHasMore(false); // filter trả về kết quả đầy đủ → tắt lazy load
    //         }
    //     } catch (err) {
    //         console.error("Lỗi fetch filter:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchData = async (reset = false) => {
        try {
            setLoading(true);
            // let url = `/v1/product?page=${page}&limit=${limit}`;
            let url = `/v1/product/filter?page=${page}&limit=${limit}`;

            // luôn thêm filter (nếu có)
            if (categoryId) url += `&categoryId=${categoryId}`;
            if (priceRange) url += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
            if (discount) url += `&discount=${discount}`;
            if (minViews) url += `&minViews=${minViews}`;
            console.log("API fetch:", `${axios.defaults.baseURL}${url}`);
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
        if (mode === "all") {
            setPage(1);
            fetchData(true);
        }
    }, [categoryId]);

    // Load khi đổi page (bấm nút xem thêm)
    useEffect(() => {
        if (mode === "all" && page > 1) fetchData();
    }, [page]);

    // Load lần đầu
    // useEffect(() => {
    //     fetchCategories();
    //     fetchProducts(true);
    // }, []);

    useEffect(() => {
        setPage(1);
        fetchData(true);
    }, [categoryId, priceRange, discount, minViews]);


    useEffect(() => {
        if (searchText === "") {
            setPage(1);
            setHasMore(true);
            fetchData(true);
        }
    }, [searchText]);


    return (
        <div style={{ padding: 20 }}>
            <h2>Danh sách sản phẩm</h2>
            <Row gutter={16}>
                {/* Cột bên trái: Filter */}
                <Col xs={24} md={6}>
                    {/* Search */}
                    <div style={{ marginBottom: 20 }}>
                        <Search
                            placeholder="Tìm sản phẩm..."
                            enterButton="Tìm"
                            onSearch={(value) => handleSearch(value)}
                            allowClear
                            style={{ width: "100%" }}
                        />
                    </div>

                    {/* Filter categories */}
                    <div style={{ marginBottom: 20 }}>
                        <h4>Danh mục</h4>
                        {categories.map((c) => (
                            <Button
                                key={c._id || "all"}
                                type={categoryId === c._id ? "primary" : "default"}
                                onClick={() => setCategoryId(c._id)}
                                style={{ margin: "5px 5px 5px 0" }}
                                block
                            >
                                {c.name}
                            </Button>
                        ))}
                    </div>

                    {/* Filter price */}
                    <div style={{ marginBottom: 20 }}>
                        <h4>Khoảng giá</h4>
                        <Slider
                            range
                            min={0}
                            max={200000}
                            step={10000}
                            value={priceRange}
                            onChange={(val) => setPriceRange(val)}
                        />
                        <p>
                            {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} VNĐ
                        </p>
                    </div>

                    {/* Filter discount */}
                    <div style={{ marginBottom: 20 }}>
                        <h4>Khuyến mãi</h4>
                        <Slider
                            min={0}
                            max={50}
                            step={5}
                            value={discount || 0}
                            onChange={(val) => setDiscount(val)}
                        />
                        <p>Giảm giá từ {discount || 0}%</p>
                    </div>

                    {/* Filter views */}
                    <div style={{ marginBottom: 20 }}>
                        <h4>Lượt xem tối thiểu</h4>
                        <Input
                            type="number"
                            placeholder="Nhập số views"
                            value={minViews || ""}
                            onChange={(e) => setMinViews(e.target.value)}
                        />
                    </div>

                    {/* khi bấm nút Áp dụng lọc */}
                    <Button type="primary" onClick={() => {
                        setPage(1);
                        fetchData(true);
                    }} block>
                        Áp dụng lọc
                    </Button>


                </Col>

                {/* Cột bên phải: Danh sách sản phẩm */}
                <Col xs={24} md={18}>
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
                </Col>
            </Row>
        </div>
    );
};

export default ProductsPage;
