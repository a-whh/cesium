import * as Cesium from "cesium";

class CesiumEarch {
  viewer: any; // Cesium Viewer 对象

  // 初始化 Cesium Viewer
  public createViewer(id = "cesiumContainer", options = {}) {
    // 设置默认的 Cesium ion 访问令牌
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzcxMDJhNS03ODAxLTQ5ZjctYTUyZS04ZWVmZjNmNzczYWIiLCJpZCI6MjcwMDkxLCJpYXQiOjE3MzczNDAwMjB9.EhOlLecfLKZHPaUcmgDjWKt_d_2cN_XX03_X7rrk9gY";
    // ArcGIS MapServer 影像服务
    // const esri = new Cesium.ArcGisMapServerImageryProvider(
    //   {
    //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    //     enablePickFeatures: false
    //   }
    // )
    // 经纬度转笛卡尔坐标
    const cartesian1 = Cesium.Cartesian3.fromDegrees(117, 36, 20); // 经度 纬度 高度
    const cartesian2 = Cesium.Cartesian3 .fromDegrees(117, 36, 20); // 经度 纬度 高度




    // 创建 Cesium Viewer 对象
    window.viewer = this.viewer = new Cesium.Viewer(
      id,
      Object.assign(
        {
          // imageryProvider: esri, // 自定义图层，默认谷歌影像图层
          // imageryProvider: new Cesium.TileMapServiceImageryProvider({
          //   url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
          // }),
          orderIndependentTranslucency: false, // 是否关闭透明度排序
          contextOptions: {
            webgl: {
              alpha: true,
            },
          }, // 启用透明度
          terrainProvider: Cesium.createWorldTerrain({
            requestWaterMask: false, // 水面遮罩
          }), // 地形数据源
          timeline: false, // 是否显示时间线控件
          animation: false, // 是否显示动画控件
          geocoder: true, // 是否显示地名查找控件
          homeButton: false, // 是否显示 Home 按钮
          sceneModePicker: false, // 是否显示 3D/2D 选择器
          baseLayerPicker: true, // 是否显示图层选择器
          navigationHelpButton: false, // 是否显示帮助信息控件
          fullscreenButton: false, // 是否显示全屏按钮
        },
        options
      )
    );
    this.createImageryProvider();
  }

  // 创建新图层（影像、标注）
  public createImageryProvider() {
    let blackMarble = this.viewer.imageryLayers.addImageryProvider(
      new Cesium.WebMapTileServiceImageryProvider({
        show: true,
        url:
          "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
          "d57610ac1d14c2abe37314f2a2de558a",
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"], // URL模板中用于{s}占位符的子域。如果该参数是单个字符串，则字符串中的每个字符都是一个子域。如果它是一个数组，数组中的每个元素都是一个子域
        layer: "tdtImgLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible", // 使用谷歌的瓦片切片方式
      })
    );
    blackMarble.alpha = 0.5; // 透明度 imageryLayer
    blackMarble.brightness = 2.0; // 亮度 imageryLayer
  }
}

export default new CesiumEarch();
