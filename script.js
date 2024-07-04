console.log("====================================");
console.log("Connected");
console.log("====================================");

const imagesArr = [
  "./Images/Thumbnail.png",
  "./Images/Thumbnail-2.png",
  "./Images/Thumbnail-3.png",
  "./Images/Thumbnail-4.png",
];

const productDescription = document.querySelector(".product-description");

const increaseQuantityBtn = document.querySelector("button.increase");
const decreaseQuantityBtn = document.querySelector("button.decrease");

const addToCartBtn = document.querySelector(".add_to_cart");

increaseQuantityBtn.addEventListener("click", () => {
  const quantity = document.querySelector(".product_count");
  quantity.innerText = +quantity.innerText + 1;
});

decreaseQuantityBtn.addEventListener("click", () => {
  const quantity = document.querySelector(".product_count");
  if (+quantity.innerText === 1) {
    return;
  }
  quantity.innerText = +quantity.innerText - 1;
});

let addedProduct = {
  color: "",
  size: "",
};

const setColor = (value) => {
  addedProduct = { ...addedProduct, color: value };
  console.log(addedProduct);
};

const setSize = (value) => {
  addedProduct = { ...addedProduct, size: value };
  console.log(addedProduct);
};

addToCartBtn.addEventListener("click", () => {
  console.log(addedProduct);
  const addProductMsg = document.querySelector(".product_added_message");
  addProductMsg.style.display = "block";
  addProductMsg.innerText = `Embrace Sideboard with Color ${addedProduct.color} and Size ${addedProduct.size} added to cart`;
});

const fetchData = async () => {
  const data = await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
  ).then((res) => res.json());
  console.log(data.product);
  return data.product;
};

const prodcuctHeader = ({ title, vendor }) => {
  const vendorTitle = document.querySelector(".text-gray");
  vendorTitle.innerText = vendor;
  const productTitle = document.querySelector(".product_title");
  productTitle.innerText = title;
};

const createPricingSection = (currPrice, originalPrice, offer) => {
  const currentPriceText = document.querySelector(".current_price_text");
  currentPriceText.innerText = currPrice;
  const offerText = document.querySelector(".offer");
  offerText.innerText = offer;
  const originalPriceElement = document.querySelector(".slashed_price");
  originalPriceElement.innerText = originalPrice;
};

const colorSelectionSection = (colors) => {
  const colorContainer = document.querySelector(".flex_container");
  colors.forEach((color) => {
    const radioBtn = document.createElement("input");
    radioBtn.setAttribute("type", "radio");
    radioBtn.setAttribute("name", "color");
    radioBtn.classList.add("radio_btn_color");
    const bgColor = Object.values(color)[0];
    radioBtn.style.setProperty("--radio-bg-color", bgColor);
    radioBtn.setAttribute("value", Object.keys(color)[0]);
    radioBtn.addEventListener("change", (e) => {
      setColor(e.target.value);
    });
    colorContainer.appendChild(radioBtn);
  });
};

const sizeSelectionSection = (sizes) => {
  const sizeContainer = document.querySelector(".size_section .flex_container");

  sizes.forEach((size) => {
    const div = document.createElement("div");
    div.classList.add("form-controller");
    const label = document.createElement("label");
    label.setAttribute("for", size);
    label.innerText = size;
    const radioBtn = document.createElement("input");
    radioBtn.setAttribute("type", "radio");
    radioBtn.setAttribute("name", "size");
    radioBtn.setAttribute("id", size);
    radioBtn.classList.add("size_radio_btn");
    radioBtn.setAttribute("value", size);

    radioBtn.addEventListener("change", (e) => {
      setSize(e.target.value);
    });
    div.appendChild(radioBtn);
    div.appendChild(label);
    sizeContainer.appendChild(div);
  });
};

const setAboutProduct = (text) => {
  const aboutProduct = document.querySelector(".about_product");
  aboutProduct.innerHTML = text;
};

const imgContainer = document.querySelector(".sample_img_container");
imagesArr.forEach((item) => {
  const img = document.createElement("img");
  img.setAttribute("src", item);
  img.classList.add("sample_img");
  imgContainer.appendChild(img);
});

fetchData().then((res) => {
  prodcuctHeader({ title: res?.title, vendor: res?.vendor });
  createPricingSection(res?.price, res?.compare_at_price, "35%");
  colorSelectionSection(res?.options[0]?.values);
  sizeSelectionSection(res?.options[1]?.values);
  setAboutProduct(res?.description);
});
