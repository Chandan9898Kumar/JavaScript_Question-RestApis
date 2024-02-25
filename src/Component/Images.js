import React, { memo } from "react";
import PropTypes from "prop-types";
import "../App.css";
const ImageModal = ({ data, itemInfo, deleteItem, updateItem, GetItemDetails }) => {
  return (
    <React.Fragment>
      <div className="flex-container">
        {data &&
          data.length > 0 &&
          data?.map((data) => {
            return (
              <div key={data.id} style={{ margin: "10px" }}>
                <picture>
                  <source srcSet={data.image} media="(min-width: 992px)" />
                  <source srcSet={data.image} media="(min-width: 768px)" />
                  <source srcSet={data.image} media="(min-width: 0px)" />
                  <img src={data.image} alt="images" loading="eager" width="300px" height="200px" />
                </picture>
                <h1>{data.name}</h1>
                <div className="buttons">
                  <button onClick={() => deleteItem(data)} style={{ marginLeft: "5px", marginRight: "5px" }}>
                    Delete Item
                  </button>
                  <button onClick={() => updateItem(data)} style={{ marginLeft: "5px", marginRight: "5px" }}>
                    Update Item
                  </button>
                  <button onClick={() => GetItemDetails(data)} style={{ marginLeft: "5px", marginRight: "5px" }}>
                    Get Item Information
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <div>
        {itemInfo &&
          itemInfo.length > 0 &&
          itemInfo?.map((data) => {
            return (
              <div key={data.id} style={{ margin: "10px" }}>
                <picture>
                  <source srcSet={data.image} media="(min-width: 992px)" />
                  <source srcSet={data.image} media="(min-width: 768px)" />
                  <source srcSet={data.image} media="(min-width: 0px)" />
                  <img src={data.image} alt="images" loading="eager" width="300px" height="200px" />
                </picture>
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <p>
                  Rs. {"  "}
                  {data.price}
                </p>
                <div>
                  <button onClick={() => updateItem(data, "Get")} style={{ marginLeft: "5px", marginRight: "5px" }}>
                    Get All Items
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

ImageModal.propTypes = {
  data: PropTypes.array,
  itemInfo: PropTypes.array,
  GetItemDetails: PropTypes.func,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default memo(ImageModal);
