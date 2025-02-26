import * as Cesium from "cesium";
import { Viewer } from "cesium";
import Cartesian2 from "cesium/Source/Core/Cartesian2";
import InterpolationAlgorithm from "cesium/Source/Core/InterpolationAlgorithm";

// 创建初始相机位置
const initialPosition = Cesium.Cartesian3.fromDegrees(
  -73.998114468289017509,
  40.674512895646692812,
  2631.082799425431
);
// 创建初始相机方向
const initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(
  7.1077496389876024807,
  -31.987223091598949054,
  0.025883251314954971306
);
// 定义初始相机视图
const homeCameraView = {
  destination: initialPosition, // 目标位置或区域。
  orientation: {
    //  相机的方向（航向角、俯仰角和翻滚角）。
    heading: initialOrientation.heading,
    pitch: initialOrientation.pitch,
    roll: initialOrientation.roll,
  },
};

class CesiumEarch {
  viewer!: Viewer; // Cesium Viewer 对象

  // 初始化 Cesium Viewer
  public createViewer(id = "cesiumContainer", options = {}) {
    // 设置默认的 Cesium ion 访问令牌
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzcxMDJhNS03ODAxLTQ5ZjctYTUyZS04ZWVmZjNmNzczYWIiLCJpZCI6MjcwMDkxLCJpYXQiOjE3MzczNDAwMjB9.EhOlLecfLKZHPaUcmgDjWKt_d_2cN_XX03_X7rrk9gY";
    // ArcGIS MapServer 影像服务
    const esri = new Cesium.ArcGisMapServerImageryProvider({
      // url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      enablePickFeatures: false,
    });

    // 创建 Cesium Viewer 对象
    this.viewer = window.viewer = new Cesium.Viewer(
      id,
      Object.assign(
        {
          // imageryProvider: esri, // 自定义图层，默认谷歌影像图层
          // imageryProvider: new Cesium.TileMapServiceImageryProvider({
          //   url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
          // }),
          orderIndependentTranslucency: false, // 是否关闭透明度排序
          contextOptions: {
            webgl: {
              alpha: true,
            },
          }, // 启用透明度
          // terrainProvider: Cesium.createWorldTerrain({
          //   requestWaterMask: true, // 水面遮罩
          // }), // 地形数据源
          timeline: false, // 是否显示时间线控件
          animation: false, // 是否显示动画控件
          geocoder: false, // 是否显示地名查找控件
          homeButton: false, // 是否显示 Home 按钮
          sceneModePicker: false, // 是否显示 3D/2D 选择器
          baseLayerPicker: false, // 是否显示图层选择器
          navigationHelpButton: false, // 是否显示帮助信息控件
          fullscreenButton: false, // 是否显示全屏按钮
        },
        options
      )
    );
    this.viewer.scene.debugShowFramesPerSecond = true;
    this.createImageryProvider();
    // this.Extras();
    this.cameraFn();
  }

  // 销毁地图
  public destroyMap() {
    this.viewer.destroy();
  }

  // 创建新图层（影像、标注）
  public async createImageryProvider() {
    // let blackMarble = this.viewer.imageryLayers
    // .addImageryProvider
    // new Cesium.WebMapTileServiceImageryProvider({
    //   url:
    //     "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
    //     "d57610ac1d14c2abe37314f2a2de558a",
    //   subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"], // URL模板中用于{s}占位符的子域。如果该参数是单个字符串，则字符串中的每个字符都是一个子域。如果它是一个数组，数组中的每个元素都是一个子域
    //   layer: "tdtImgLayer",
    //   style: "default",
    //   format: "image/jpeg",
    //   tileMatrixSetID: "GoogleMapsCompatible", // 使用谷歌的瓦片切片方式
    // })
    // ();
    // blackMarble.alpha = 0.5; // 透明度 imageryLayer
    // blackMarble.brightness = 2.0; // 亮度 imageryLayer

    /**
     * @描述：1 通过cesiumIcon增加影像
     */
    // // Remove default base layer 移出默认图层
    // this.viewer.imageryLayers.remove(this.viewer.imageryLayers.get(0));
    // // Add Sentinel-2 imagery 增加Sentinel-2数据源
    // this.viewer.imageryLayers.addImageryProvider(
    //   new Cesium.IonImageryProvider({ assetId: 3954 })
    // );

    /**
     * @描述：2 通过cesiumIcon增加地形
     */
    // 方法 1
    // try {
    //   // 使用 Cesium.IonResource.fromAssetId 获取资源
    //   Cesium.IonResource.fromAssetId(3956).then((resource) => {
    //     // 创建 CesiumTerrainProvider 实例，并传入资源
    //     const terrainProvider = new Cesium.CesiumTerrainProvider({
    //       url: resource,
    //     });
    //     // 将地形提供者设置到 viewer 中
    // this.viewer.terrainProvider = terrainProvider;
    //     alert('地形添加成功！')
    //   });
    // } catch (error) {
    //   window.alert(`Failed to load terrain. ${error}`);
    // }
    // this.viewer.scene.camera.flyTo({
    //   destination: Cesium.Cartesian3.fromRadians(
    //     -2.6399828792482234,
    //     1.0993550795541742,
    //     5795
    //   ),
    //   orientation: {
    //     heading: 3.8455,
    //     pitch: -0.4535,
    //     roll: 0.0,
    //   },
    //   duration: 0.0,
    // });
    // 方法2
    // this.viewer.terrainProvider = Cesium.createWorldTerrain({
    //   requestWaterMask: true, // required for water effects
    //   requestVertexNormals: true, // required for terrain lighting
    // });
    // // 启用深度测试，使得地形后面的物体不会被错误地渲染在地形前面
    // this.viewer.scene.globe.depthTestAgainstTerrain = true;

    // // 加载一个3D模型作为示例
    // const modelEntity = this.viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    //   model: {
    //     uri: "/public/Wood_Tower.glb",
    //   },
    // });

    // this.viewer.trackedEntity = modelEntity;

    /**
     * @描述：3 Configuring the Scene - 配置视窗
     */
    // 常用的飞行方法如下：
    // Camera.setView(options): 在特定位置和方向立即设置相机。
    // Camera.zoomIn(amount): 沿着视角矢量移动摄像机。
    // Camera.zoomOut(amount): 沿视角矢量向后移动摄像机。
    // Camera.flyTo(options): 创建从当前相机位置到新位置的动画相机飞行。
    // Camera.lookAt(target, offset) : 定位并定位摄像机以给定偏移量瞄准目标点。
    // Camera.move(direction, amount) : 朝任何方向移动摄像机。
    // Camera.rotate(axis, angle) : 绕任意轴旋转相机。
    // 使用 CesiumJS 时用于启用基于太阳和月亮位置的光照效果
    this.viewer.scene.globe.enableLighting = true;

    // this.viewer.scene.camera.setView(homeCameraView);
    // this.viewer.scene.camera.flyTo({
    //   ...homeCameraView,
    //   duration: 2, // 动画持续时间。
    //   maximumHeight: 2000, // 飞行过程中允许的最大高度。
    //   pitchAdjustHeight: 2000, // 当相机的高度低于此值时调整俯仰角。
    //   endTransform: Cesium.Matrix4.IDENTITY, //  目标变换矩阵（一个 4x4 的单位矩阵）
    // });

    // Set up clock and timeline.
    this.viewer.clock.shouldAnimate = true; // make the animation play when the viewer starts
    // this.viewer.clock.startTime = Cesium.JulianDate.frofclockmIso8601(
    //   "2017-07-11T16:00:00Z"
    // );
    // this.viewer.clock.stopTime = Cesium.JulianDate.fromIso8601(
    //   "2017-07-11T16:20:00Z"
    // );
    // this.viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
    //   "2017-07-11T16:00:00Z"
    // );
    // this.viewer.clock.multiplier = 2; // sets a speedup
    // this.viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER; // tick computation mode
    // this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // loop at the end
    // this.viewer.timeline.zoomTo(
    //   this.viewer.clock.startTime,
    //   this.viewer.clock.stopTime
    // ); // set visible range

    /**
     * @描述：4  Loading and Styling Entities - 加载和样式化实体
     */
    // this.stylingEntitiesFun();

    /**
     * @描述：5  3D Tiles
     */
    // this.TilesFun();
  }

  /**
   * 绘制形状
   */
  public async drawShape() {
    // var redBox = this.viewer.entities.add({
    //   name: "Red box with black outline",
    //   position: Cesium.Cartesian3.fromDegrees(121.4737, 31.2304, 100), // 上海
    //   box: {
    //     dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    //     material: Cesium.Color.RED.withAlpha(0.5),
    //     outline: true,
    //     outlineColor: Cesium.Color.BLACK,
    //   },
    // });
    // this.viewer.zoomTo(this.viewer.entities);
    // 通过CZML增加
    // var czml = [
    //   {
    //     id: "document",
    //     name: "box",
    //     version: "1.0",
    //   },
    //   {
    //     id: "shape2",
    //     name: "Red box",
    //     position: {
    //       cartographicDegrees: [-107.0, 40.0, 300000.0],
    //     },
    //     box: {
    //       dimensions: {
    //         cartesian: [400000.0, 300000.0, 500000.0],
    //       },
    //       material: {
    //         solidColor: {
    //           color: {
    //             rgba: [255, 0, 0, 128],
    //           },
    //         },
    //       },
    //       outline: true,
    //       outlineColor: {
    //         rgba: [0, 0, 0, 255],
    //       },
    //     },
    //   },
    // ];

    // const data = Cesium.CzmlDataSource.load(czml);
    // this.viewer.dataSources.add(data);
    // this.viewer.zoomTo(data);
    // 增加点位
    // this.viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(116, 36.6),
    //   point: {
    //     pixelSize: 12,
    //     color: Cesium.Color.YELLOWGREEN,
    //     outlineColor: Cesium.Color.BLACK,
    //     outlineWidth: 2,
    //   },
    // });
    // EllipseGraphics 椭圆
    // const ellipse = new Cesium.Entity({
    //   position: Cesium.Cartesian3.fromDegrees(116.7, 36.6, 100),
    //   ellipse: {
    //     semiMinorAxis: 3000, // 椭圆短半轴
    //     semiMajorAxis: 3000, // 椭圆长半轴
    //     height: 3000,
    //     heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    //     extrudedHeight: 4000, // 拉伸高度
    //     material: Cesium.Color.YELLOWGREEN.withAlpha(0.6),
    //     outline: true,
    //     outlineColor: Cesium.Color.BLACK,
    //     rotation: Cesium.Math.toRadians(45), // 旋转角度 从正北方开始顺时旋转
    //   },
    // });
    // this.viewer.entities.add(ellipse);

    // 走廊对象 CorridorGraphics
    // const redCorridor = this.viewer.entities.add({
    //   name: "red CorridorGraphics",
    //   corridor: {
    //     positions: Cesium.Cartesian3.fromDegreesArray([
    //       -100, 40, -105, 40, -105, 35,
    //     ]),
    //     width: 200000,
    //     granularity: 3, // 指定每个纬度和经度之间的距离
    //     height: 2000,
    //     extrudedHeight: 0, // 指定走廊的凸出面相对于椭球面的高度。
    //     material: Cesium.Color.RED.withAlpha(0.5),
    //   },
    // });
    var x = 360.0;
    var y = -920.0;
    var z = -820.0;
    var m = Cesium.Matrix4.fromArray([
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      x,
      y,
      z,
      1.0,
    ]);
    var tileset = this.viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: "/public/Cesium/testm3DTiles.json", //数据路径
        maximumScreenSpaceError: 2, //最大的屏幕空间误差
        modelMatrix: m, //形状矩阵
      })
    );
    this.viewer.zoomTo(tileset);

    var a = tileset.modelMatrix;
    //RotateX为旋转角度，转为弧度再参与运算
    var m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(90));

    //矩阵计算
    Cesium.Matrix4.multiplyByMatrix3(a, m1, a);

    //赋值
    tileset.modelMatrix = a;
  }

  /**
   * @描述：4  Loading and Styling Entities - 加载和样式化实体
   */
  public async stylingEntitiesFun() {
    // Polygon（多边形）
    // this.viewer.entities.add({
    //   polygon: {
    //     hierarchy: Cesium.Cartesian3.fromDegreesArray([
    //       -100.0, 30.0, -105.0, 30.0, -105.0, 40.0, -100.0, 40.0,
    //     ]),
    //     material: Cesium.Color.RED.withAlpha(0.5), // 设置填充颜色
    //   },
    // });
    // // polyline（折线）
    // this.viewer.entities.add({
    //   polyline: {
    //     positions: Cesium.Cartesian3.fromDegreesArray([
    //       117.0, 36.0, 116.0, 36.0, 115.0, 36.0, 114.0, 36.0,
    //     ]),
    //     width: 5, // 线宽
    //     material: Cesium.Color.BLUE, // 设置线条颜色
    //   },
    // });
    // // 3. Billboard（图标）
    // this.viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(-100.0, 30.0),
    //   billboard: {
    //     image: "/public/vite.svg", // 图标路径
    //     scale: 0.5, // 缩放比例
    //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直对齐方式
    //   },
    // });
    // 4. Label（标签）
    // this.viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(-100.0, 30.0),
    //   label: {
    //     text: "Hello Cesium!",
    //     font: "12px sans-serif",
    //     fillColor: Cesium.Color.WHITE,
    //     outlineColor: Cesium.Color.BLACK,
    //     outlineWidth: 2,
    //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //     horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    //   },
    // });
    var kmlOptions = {
      camera: this.viewer.scene.camera,
      canvas: this.viewer.scene.canvas,
      clampToGround: true,
    };
    var geocachePromise = Cesium.KmlDataSource.load(
      "/public/Cesium/sampleGeocacheLocations.kml",
      kmlOptions
    );
    // Add geocache billboard entities to scene and style them
    geocachePromise.then((dataSource) => {
      // Add the new data as entities to the viewer
      this.viewer.dataSources.add(dataSource);

      // 得到这些实体的数组
      const geocacheEntities = dataSource.entities.values;

      for (let i = 0; i < geocacheEntities.length; i++) {
        let entity: any = geocacheEntities[i];
        if (Cesium.defined(entity.billboard)) {
          // 在此设置实体的样式
          // Adjust the vertical origin so pins sit on terrain 调整垂直对齐方式
          entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM; // 将图标的垂直对齐方式设置为底部对齐。这意味着图标将从其地理坐标位置的底部开始绘制，从而使其看起来像是“坐”在地形表面上。
          // Disable the labels to reduce clutter: 通过将 entity.label 设置为 undefined 来禁用该实体的标签。这有助于减少地图上的视觉杂乱，特别是在有很多标注的情况下。
          entity.label = undefined;
          // 设置图标的距离显示条件。这是一个对象，用于指定图标在特定相机距离范围内可见的条件。
          entity.billboard.distanceDisplayCondition =
            new Cesium.DistanceDisplayCondition(10.0, 20000.0); // 创建一个新的 DistanceDisplayCondition 对象，指定图标在相机与地球表面的距离在 10.0 米到 20000.0 米之间时可见。如果相机距离小于 10.0 米或大于 20000.0 米，图标将不可见。

          const cartographicPosition = Cesium.Cartographic.fromCartesian(
            entity.position?.getValue(Cesium.JulianDate.now())
          );
          const longitude = Cesium.Math.toDegrees(
            cartographicPosition.longitude
          );
          const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);

          const description = `<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody><tr><th>Longitude</th><td>${longitude.toFixed(
            5
          )}</td></tr><tr><th>Latitude</th><td>${latitude.toFixed(
            5
          )}</td></tr></tbody></table>`;

          entity.description = description;
        }
      }
    });

    // 为每个纽约街区记载一个包含多边形的GeoJson文件
    const geojsonOptions = {
      clampToGround: true, // 将几何图形贴附到地形表面，而不是悬浮在空中。
    };
    const neighborhoodsPromise = Cesium.GeoJsonDataSource.load(
      "/public/Cesium/sampleNeighborhoods.geojson",
      geojsonOptions
    );
    let neighborhoods;
    const dataSource = await neighborhoodsPromise;
    this.viewer.dataSources.add(dataSource);
    neighborhoods = dataSource.entities; // 获取数据源中的所有实体（entities）

    const neighborhoodEntities = dataSource.entities.values;
    for (let i = 0; i < neighborhoodEntities.length; i++) {
      const entity: any = neighborhoodEntities[i];
      if (Cesium.defined(entity.polygon)) {
        // 设置实体名称
        entity.name = entity.properties?.neighborhood ?? "name";
        // 设置多边形材质
        entity.polygon.material = Cesium.Color.fromRandom({
          red: 0.1,
          maximumGreen: 0.5,
          minimumBlue: 0.5,
          alpha: 0.6,
        }); // 生成随机颜色，但限制了红色、绿色和蓝色的范围，并设置了透明度。
        // : 将多边形分类为地形，使其与地形表面更好地融合。
        entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;

        // 获取多边形的位置 获取当前时间下的多边形顶点位置
        const polyPositions = entity.polygon?.hierarchy?.getValue(
          Cesium.JulianDate.now()
        ).positions;
        // 获取中心点的位置 计算多边形顶点的边界球，并获取其中心点。
        let polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;

        // 将中心点转换为地理坐标（WGS84 椭球体上的点）。
        polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);

        // 设置实体位置
        entity.position = polyCenter;
        // 添加标签
        entity.label = {
          text: entity.name, // 标签显示的内容为实体名称。
          showBackground: true, // 显示背景以提高可读性。
          scale: 0.6, //  缩放比例。
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 水平对齐方式为居中。
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直对齐方式为底部对齐。
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition( // 设置标签在特定距离范围内可见。
            10.0,
            8000.0
          ),
          disableDepthTestDistance: 100, // 在一定距离内禁用深度测试，确保标签始终可见。
        };
      }
    }

    // 添加无人机飞行来增加我们的NYC geocaches 的高科技视角。
    const dronePromise = Cesium.CzmlDataSource.load(
      "/public/Cesium/sampleFlight.czml"
    );
    var drone: any;
    dronePromise.then((dataSource) => {
      this.viewer.dataSources.add(dataSource);
      // Get the entity using the id defined in the CZML data
      drone = dataSource.entities.getById("Aircraft/Aircraft1");
      // Attach a 3D model
      drone.model = {
        uri: "/public/Cesium/CesiumDrone.glb",
        minimumPixelSize: 128,
        maximumScale: 1000,
        silhouetteColor: Cesium.Color.WHITE,
        silhouetteSize: 2,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition( // 设置标签在特定距离范围内可见。
          10.0,
          10000.0
        ),
      };
      drone.orientation = new Cesium.VelocityOrientationProperty(
        drone?.position
      );
      drone?.position.setInterpolationOptions({
        interpolationDegree: 3,
        InterpolationAlgorithm: Cesium.HermitePolynomialApproximation,
      });
      // 跟踪一个实体 视角追踪无人机
      // this.viewer.trackedEntity = drone;

      // 1 取消跟踪 2 返回视角到初始视角
      this.viewer.trackedEntity = undefined;
      this.viewer.scene.camera.flyTo(homeCameraView);
    });
  }

  /**
   * @描述：5  3D Tiles
   */
  public TilesFun = async () => {
    const city = this.viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(75343) })
    );
    const defaultStyle = new Cesium.Cesium3DTileStyle({
      color: "color('#fff')",
      show: true,
    });

    var heightStyle = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [
          ["${Height} >= 300", "rgba(45, 0, 75, 0.5)"],
          ["${Height} >= 200", "rgb(102, 71, 151)"],
          ["${Height} >= 100", "rgb(170, 162, 204)"],
          ["${Height} >= 50", "rgb(224, 226, 238)"],
          ["${Height} >= 25", "rgb(252, 230, 200)"],
          ["${Height} >= 10", "rgb(248, 176, 87)"],
          ["${Height} >= 5", "rgb(198, 106, 11)"],
          ["true", "rgb(127, 59, 8)"],
        ],
      },
    });

    const highlighted: any = {
      feature: undefined,
      originalColor: new Cesium.Color(),
    };
    city.style = heightStyle;

    var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    const div = document.createElement("div");
    this.viewer.container.appendChild(div);
    div.className = "backdrop";
    div.style.display = "none";
    div.style.position = "absolute";
    div.style.bottom = "0";
    div.style.left = "0";
    div.style.backgroundColor = "#303030";
    let tableHtmlScratch = "";
    let materialsScratch;

    handler.setInputAction((movement: any) => {
      if (Cesium.defined(highlighted.feature)) {
        highlighted.feature.color = highlighted.originalColor;
        highlighted.feature = undefined;
      }
      // 获取实体
      var feature = this.viewer.scene.pick(movement.endPosition);
      const featurePickd = feature instanceof Cesium.Cesium3DTileFeature;

      // 是否有height属性
      const isBuildingFeature = featurePickd && feature.hasProperty("Height");
      const isTerrainFeature =
        featurePickd && feature.hasProperty("Majority_Ownership_Type");

      if (isTerrainFeature) {
        div.style.display = "block";
        div.style.bottom = `${
          this.viewer.canvas.clientHeight - movement.endPosition.y
        }px`;
        div.style.left = `${movement.endPosition.x}px`;

        materialsScratch = feature.getProperty("Majority_Ownership_Type");

        tableHtmlScratch = `<span>${materialsScratch ?? ""}</span>`;
        div.innerHTML = tableHtmlScratch;
      } else {
        div.style.display = "none";
      }

      if (isBuildingFeature) {
        highlighted.feature = feature;
        Cesium.Color.clone(feature.color, highlighted.originalColor);
        feature.color = Cesium.Color.MAGENTA;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  };

  /**
   *  以上为初级教程 ↑↑↑↑↑↑↑
   *
   *  以下为中级教程 ↓↓↓↓↓↓↓
   *  1 空间数据可视化
   */
  public Extras = async () => {
    // 创建面
    const ehm = this.viewer.entities.add({
      name: "Wyoming polygon",
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray([
            -109.080842, 45.002073, -105.91517, 45.002073, -104.058488,
            44.996596, -104.053011, 43.002989, -104.053011, 41.003906,
            -105.728954, 40.998429, -107.919731, 41.003906, -109.04798,
            40.998429, -111.047063, 40.998429, -111.047063, 42.000709,
            -111.047063, 44.476286, -111.05254, 45.002073,
          ])
        ),
        height: 0,
        fill: true,
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });
    // 提高面的高度
    (ehm as any).polygon.height = 200000;
    (ehm as any).polygon.extrudedHeight = 250000;
    // 以上两个代码生成一个立方体
    this.viewer.zoomTo(ehm);

    // 创建椭圆
    const tuoyuan = this.viewer.entities.add({
      name: "椭圆 ellipse",
      position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
      ellipse: {
        semiMinorAxis: 250000.0,
        semiMajorAxis: 400000.0,
        // material: Cesium.Color.BLACK.withAlpha(0.3), // 纯色
        // 棋盘
        // material: new Cesium.CheckerboardMaterialProperty({
        //   evenColor: Cesium.Color.YELLOWGREEN,
        //   oddColor: Cesium.Color.BLACK,
        //   repeat: new Cesium.Cartesian2(10, 10),
        // }),
        // 条纹
        // material: new Cesium.StripeMaterialProperty({
        //   evenColor: Cesium.Color.WHITE,
        //   oddColor: Cesium.Color.BLACK,
        //   repeat: 33,
        // }),
        // 网格
        // material: new Cesium.GridMaterialProperty({
        //   color: Cesium.Color.YELLOWGREEN,
        //   cellAlpha: 0.3,
        //   lineCount: new Cesium.Cartesian2(8, 10),
        //   lineThickness: new Cesium.Cartesian2(2, 2),
        // }),
      },
    });
    // 轮廓
    const ellipse: any = tuoyuan.ellipse;
    ellipse.fill = false;
    ellipse.outline = true;
    ellipse.outlineColor = Cesium.Color.YELLOW;
    ellipse.outlineWidth = 2;

    // 折线
    const polyline = this.viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]),
        width: 5,
        // 纯色
        // material: Cesium.Color.RED,
        // 轮廓
        // material: new Cesium.PolylineOutlineMaterialProperty({
        //   color: Cesium.Color.ORANGE,
        //   outlineColor: Cesium.Color.BLACK,
        //   outlineWidth: 3,
        // }),
        // 折线光晕
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.2,
          color: Cesium.Color.ORANGE,
        }),
      },
    });
  };

  /**
   *  2  图层
   */
  public LayerFn = async () => {
    const layer = this.viewer.scene.imageryLayers;
    const a = new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer",
      maximumLevel: 8,
      credit: "Black Marble imagery courtesy NASA Earth Observatory",
    });
    const blackMarble = layer.addImageryProvider(a);

    // 透明度
    blackMarble.alpha = 0.5;
    // 亮度
    blackMarble.brightness = 1;
  };

  /**
   *  3  Camera  相机
   */
  public cameraFn = async () => {
    //   this.viewer.camera.setView({
    //     destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 1000),
    //     orientation: {
    //       heading: 0,
    //       pitch: 0,
    //       roll: 0,
    //     },
    //   });

    // 禁用默认事件操作
    const scene = this.viewer.scene;
    const canvas = this.viewer.canvas;
    canvas.setAttribute("tabindex", "0"); // 设置canvas的tabindex属性为0，使其可以接受键盘事件
    canvas.onclick = function () {
      canvas.focus(); // 点击canvas时，使canvas获得焦点
    };
    const ellipsoid = this.viewer.scene.globe.ellipsoid; // 获取地球的椭球体
    scene.screenSpaceCameraController.enableRotate = false; // 禁用旋转
    scene.screenSpaceCameraController.enableZoom = false; // 禁用缩放
    scene.screenSpaceCameraController.enableTranslate = false; // 禁用平移
    scene.screenSpaceCameraController.enableTilt = false; // 禁用倾斜
    scene.screenSpaceCameraController.enableLook = false; // 禁用视角
    // 创建变量记录当前鼠标位置，然后标记并跟随Camera移动轨迹：
    let startMousePosition: any;
    let mousePosition: any;
    const flags = {
      looking: false,
      moveForward: false,
      moveBackward: false,
      moveUp: false,
      moveDown: false,
      moveLeft: false,
      moveRight: false,
    };
    // 添加一个事件控制用户设置标记，当鼠标左键被点击的时候，用于记录当前鼠标的位置：
    const handler = new Cesium.ScreenSpaceEventHandler(canvas);
    handler.setInputAction((movement: any) => {
      flags.looking = true;
      mousePosition = startMousePosition = Cesium.Cartesian3.clone(
        movement.position
      );
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN); // 鼠标左键点击事件
    handler.setInputAction((movement: any) => {
      mousePosition = movement.endPosition;
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE); // 鼠标移动事件
    handler.setInputAction((position: any) => {
      flags.looking = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP); // 鼠标左键释放事件

    // 创建键盘事件控制用户切换Camera移动标记。我们为下列按键和行为设置了标记：
    function getFlagForKeyCode(keyCode: number) {
      switch (keyCode) {
        case "W".charCodeAt(0):
          return "moveForward";
        case "S".charCodeAt(0):
          return "moveBackward";
        case "Q".charCodeAt(0):
          return "moveUp";
        case "E".charCodeAt(0):
          return "moveDown";
        case "D".charCodeAt(0):
          return "moveRight";
        case "A".charCodeAt(0):
          return "moveLeft";
        default:
          return undefined;
      }
    }

    document.addEventListener(
      "keydown",
      (event) => {
        const flagName = getFlagForKeyCode(event.keyCode);
        if (typeof flagName !== "undefined") {
          flags[flagName] = true;
        }
      },
      false
    );

    document.addEventListener(
      "keyup",
      (event) => {
        const flagName = getFlagForKeyCode(event.keyCode);
        if (typeof flagName !== "undefined") {
          flags[flagName] = false;
        }
      },
      false
    );

    // 现在当标记表明事件发生为true是，我们更新（update）camera。我们新增**onTick的监听事件在clock中：
    this.viewer.clock.onTick.addEventListener((clock) => {
      const camera = this.viewer.camera;
    });
    // 接下来，我们让Camera指向鼠标指向的方向。在变量声明之后添加下列代码到事件监听函数：
    if (flags.looking) {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      //  coordinate (0.0, 0.0) will be where the mouse was clicked
      const x = mousePosition.x - startMousePosition.x;
    }
  };
}
export default new CesiumEarch();
