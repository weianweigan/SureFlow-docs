const fs = require('fs');
const path = require('path');

// 创建一个具有液压阀块特征的多边形网格：
// 1. 主阀体长方体 (Block): -1.2 ~ 1.2, -0.9 ~ 0.9, -0.8 ~ 0.8
// 2. 顶面安装凸台与 4 个阀口凹槽
// 3. 侧面 2 个接头孔特征

function createHydraulicBlockGLB() {
  const vertices = [];
  const normals = [];
  const indices = [];

  function addQuad(p1, p2, p3, p4, n) {
    const base = vertices.length / 3;
    vertices.push(...p1, ...p2, ...p3, ...p4);
    normals.push(...n, ...n, ...n, ...n);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }

  function addBox(minX, minY, minZ, maxX, maxY, maxZ) {
    // Front (+Z)
    addQuad([minX, minY, maxZ], [maxX, minY, maxZ], [maxX, maxY, maxZ], [minX, maxY, maxZ], [0, 0, 1]);
    // Back (-Z)
    addQuad([maxX, minY, minZ], [minX, minY, minZ], [minX, maxY, minZ], [maxX, maxY, minZ], [0, 0, -1]);
    // Top (+Y)
    addQuad([minX, maxY, maxZ], [maxX, maxY, maxZ], [maxX, maxY, minZ], [minX, maxY, minZ], [0, 1, 0]);
    // Bottom (-Y)
    addQuad([minX, minY, minZ], [maxX, minY, minZ], [maxX, minY, maxZ], [minX, minY, maxZ], [0, -1, 0]);
    // Right (+X)
    addQuad([maxX, minY, maxZ], [maxX, minY, minZ], [maxX, maxY, minZ], [maxX, maxY, maxZ], [1, 0, 0]);
    // Left (-X)
    addQuad([minX, minY, minZ], [minX, minY, maxZ], [minX, maxY, maxZ], [minX, maxY, minZ], [-1, 0, 0]);
  }

  function addCylinder(cx, cy, cz, radius, height, axis = 'y') {
    const segments = 16;
    const baseIdx = vertices.length / 3;

    // 绘制圆柱侧面
    for (let i = 0; i < segments; i++) {
      const theta1 = (i / segments) * Math.PI * 2;
      const theta2 = ((i + 1) / segments) * Math.PI * 2;
      const cos1 = Math.cos(theta1), sin1 = Math.sin(theta1);
      const cos2 = Math.cos(theta2), sin2 = Math.sin(theta2);

      if (axis === 'y') {
        const p1 = [cx + radius * cos1, cy, cz + radius * sin1];
        const p2 = [cx + radius * cos2, cy, cz + radius * sin2];
        const p3 = [cx + radius * cos2, cy + height, cz + radius * sin2];
        const p4 = [cx + radius * cos1, cy + height, cz + radius * sin1];
        addQuad(p1, p2, p3, p4, [cos1, 0, sin1]);
      } else if (axis === 'z') {
        const p1 = [cx + radius * cos1, cy + radius * sin1, cz];
        const p2 = [cx + radius * cos2, cy + radius * sin2, cz];
        const p3 = [cx + radius * cos2, cy + radius * sin2, cz + height];
        const p4 = [cx + radius * cos1, cy + radius * sin1, cz + height];
        addQuad(p1, p2, p3, p4, [cos1, sin1, 0]);
      }
    }
  }

  // 主阀块
  addBox(-1.0, -0.6, -0.7, 1.0, 0.6, 0.7);

  // 顶面安装面凸台 (ISO 4401-03 安装基准面)
  addBox(-0.6, 0.6, -0.45, 0.6, 0.68, 0.45);

  // 顶面 4 个阀口法兰凸缘 (P, T, A, B 油口特征)
  addCylinder(-0.25, 0.68, -0.15, 0.08, 0.04, 'y');
  addCylinder(0.25, 0.68, -0.15, 0.08, 0.04, 'y');
  addCylinder(-0.25, 0.68, 0.15, 0.08, 0.04, 'y');
  addCylinder(0.25, 0.68, 0.15, 0.08, 0.04, 'y');

  // 侧面进出油口工艺螺纹凸缘 (P0, T0 接头)
  addCylinder(-0.5, 0.0, 0.7, 0.14, 0.08, 'z');
  addCylinder(0.5, 0.0, 0.7, 0.14, 0.08, 'z');

  // 4 个角落沉头安装螺栓孔柱
  addCylinder(-0.85, 0.6, -0.55, 0.06, 0.03, 'y');
  addCylinder(0.85, 0.6, -0.55, 0.06, 0.03, 'y');
  addCylinder(-0.85, 0.6, 0.55, 0.06, 0.03, 'y');
  addCylinder(0.85, 0.6, 0.55, 0.06, 0.03, 'y');

  const vertexCount = vertices.length / 3;
  const indexCount = indices.length;

  // 计算包围盒
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (let i = 0; i < vertices.length; i += 3) {
    minX = Math.min(minX, vertices[i]);
    minY = Math.min(minY, vertices[i + 1]);
    minZ = Math.min(minZ, vertices[i + 2]);
    maxX = Math.max(maxX, vertices[i]);
    maxY = Math.max(maxY, vertices[i + 1]);
    maxZ = Math.max(maxZ, vertices[i + 2]);
  }

  // 组装二进制 Buffer
  const vertexBuffer = Buffer.from(new Float32Array(vertices).buffer);
  const normalBuffer = Buffer.from(new Float32Array(normals).buffer);
  const indexBuffer = Buffer.from(new Uint16Array(indices).buffer);

  // 对齐 4 字节
  function pad4(buf) {
    const pad = (4 - (buf.length % 4)) % 4;
    return pad > 0 ? Buffer.concat([buf, Buffer.alloc(pad)]) : buf;
  }

  const paddedIndex = pad4(indexBuffer);
  const paddedVertex = pad4(vertexBuffer);
  const paddedNormal = pad4(normalBuffer);

  const binBuffer = Buffer.concat([paddedIndex, paddedVertex, paddedNormal]);

  const indexByteLength = indexBuffer.length;
  const vertexByteLength = vertexBuffer.length;
  const normalByteLength = normalBuffer.length;

  const gltf = {
    asset: { version: '2.0', generator: 'SureFlow Valve Block Generator' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: 'Hydraulic_Manifold_Block' }],
    meshes: [
      {
        name: 'Block_Mesh',
        primitives: [
          {
            attributes: { POSITION: 1, NORMAL: 2 },
            indices: 0,
            material: 0,
            mode: 4,
          },
        ],
      },
    ],
    materials: [
      {
        name: 'Aerospace_Aluminum_Anodized',
        pbrMetallicRoughness: {
          baseColorFactor: [0.82, 0.88, 0.94, 1.0], // 科技冷银色金属
          metallicFactor: 0.85,
          roughnessFactor: 0.28,
        },
        doubleSided: true,
      },
    ],
    buffers: [{ byteLength: binBuffer.length }],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: indexByteLength, target: 34963 }, // ELEMENT_ARRAY_BUFFER
      { buffer: 0, byteOffset: paddedIndex.length, byteLength: vertexByteLength, target: 34962 }, // ARRAY_BUFFER
      { buffer: 0, byteOffset: paddedIndex.length + paddedVertex.length, byteLength: normalByteLength, target: 34962 },
    ],
    accessors: [
      {
        bufferView: 0,
        byteOffset: 0,
        componentType: 5123, // UNSIGNED_SHORT
        count: indexCount,
        type: 'SCALAR',
        min: [0],
        max: [vertexCount - 1],
      },
      {
        bufferView: 1,
        byteOffset: 0,
        componentType: 5126, // FLOAT
        count: vertexCount,
        type: 'VEC3',
        min: [minX, minY, minZ],
        max: [maxX, maxY, maxZ],
      },
      {
        bufferView: 2,
        byteOffset: 0,
        componentType: 5126, // FLOAT
        count: vertexCount,
        type: 'VEC3',
      },
    ],
  };

  const jsonString = JSON.stringify(gltf);
  const jsonBuffer = pad4(Buffer.from(jsonString, 'utf-8'));

  const totalLength = 12 + 8 + jsonBuffer.length + 8 + binBuffer.length;
  const glbHeader = Buffer.alloc(12);
  glbHeader.writeUInt32LE(0x46546c67, 0); // 'glTF'
  glbHeader.writeUInt32LE(2, 4); // version 2
  glbHeader.writeUInt32LE(totalLength, 8);

  const jsonChunkHeader = Buffer.alloc(8);
  jsonChunkHeader.writeUInt32LE(jsonBuffer.length, 0);
  jsonChunkHeader.writeUInt32LE(0x4e4f534a, 4); // 'JSON'

  const binChunkHeader = Buffer.alloc(8);
  binChunkHeader.writeUInt32LE(binBuffer.length, 0);
  binChunkHeader.writeUInt32LE(0x004e4942, 4); // 'BIN\0'

  return Buffer.concat([glbHeader, jsonChunkHeader, jsonBuffer, binChunkHeader, binBuffer]);
}

const outDir = path.join(__dirname, '../public/models');
fs.mkdirSync(outDir, { recursive: true });
const glbData = createHydraulicBlockGLB();
const outFile = path.join(outDir, 'hydraulic-block.glb');
fs.writeFileSync(outFile, glbData);
console.log(`Successfully generated GLB model at: ${outFile} (${glbData.length} bytes)`);
