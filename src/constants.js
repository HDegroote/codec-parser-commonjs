const symbol = Symbol;

// prettier-ignore
/*
[
  [
    "left, right",
    "left, right, center",
    "left, center, right",
    "center, left, right",
    "center"
  ],
  [
    "front left, front right",
    "front left, front right, front center",
    "front left, front center, front right",
    "front center, front left, front right",
    "front center"
  ],
  [
    "side left, side right",
    "side left, side right, side center",
    "side left, side center, side right",
    "side center, side left, side right",
    "side center"
  ],
  [
    "rear left, rear right",
    "rear left, rear right, rear center",
    "rear left, rear center, rear right",
    "rear center, rear left, rear right",
    "rear center"
  ]
]
*/

const mappingJoin = ", ";

const channelMappings = (() => {
  const front = "front";
  const side = "side";
  const rear = "rear";
  const left = "left";
  const center = "center";
  const right = "right";

  return ["", front + " ", side + " ", rear + " "].map((x) =>
    [
      [left, right],
      [left, right, center],
      [left, center, right],
      [center, left, right],
      [center],
    ].flatMap((y) => y.map((z) => x + z).join(mappingJoin)),
  );
})();

const lfe = "LFE";
const monophonic = "monophonic (mono)";
const stereo = "stereo";
const surround = "surround";

const getChannelMapping = (channelCount, ...mappings) =>
  `${
    [
      monophonic,
      stereo,
      `linear ${surround}`,
      "quadraphonic",
      `5.0 ${surround}`,
      `5.1 ${surround}`,
      `6.1 ${surround}`,
      `7.1 ${surround}`,
    ][channelCount - 1]
  } (${mappings.join(mappingJoin)})`;

// prettier-ignore
const vorbisOpusChannelMapping = [
  monophonic,
  getChannelMapping(2,channelMappings[0][0]),
  getChannelMapping(3,channelMappings[0][2]),
  getChannelMapping(4,channelMappings[1][0],channelMappings[3][0]),
  getChannelMapping(5,channelMappings[1][2],channelMappings[3][0]),
  getChannelMapping(6,channelMappings[1][2],channelMappings[3][0],lfe),
  getChannelMapping(7,channelMappings[1][2],channelMappings[2][0],channelMappings[3][4],lfe),
  getChannelMapping(8,channelMappings[1][2],channelMappings[2][0],channelMappings[3][0],lfe),
]

// sampleRates
const rate192000 = 192000;
const rate176400 = 176400;
const rate96000 = 96000;
const rate88200 = 88200;
const rate64000 = 64000;
const rate48000 = 48000;
const rate44100 = 44100;
const rate32000 = 32000;
const rate24000 = 24000;
const rate22050 = 22050;
const rate16000 = 16000;
const rate12000 = 12000;
const rate11025 = 11025;
const rate8000 = 8000;
const rate7350 = 7350;

// header key constants
const absoluteGranulePosition = "absoluteGranulePosition";
const bandwidth = "bandwidth";
const bitDepth = "bitDepth";
const bitrate = "bitrate";
const bitrateMaximum = bitrate + "Maximum";
const bitrateMinimum = bitrate + "Minimum";
const bitrateNominal = bitrate + "Nominal";
const buffer = "buffer";
const bufferFullness = buffer + "Fullness";
const codec = "codec";
const codecFrames = codec + "Frames";
const coupledStreamCount = "coupledStreamCount";
const crc = "crc";
const crc16 = crc + "16";
const crc32 = crc + "32";
const data = "data";
const description = "description";
const duration = "duration";
const emphasis = "emphasis";
const hasOpusPadding = "hasOpusPadding";
const header = "header";
const isContinuedPacket = "isContinuedPacket";
const isCopyrighted = "isCopyrighted";
const isFirstPage = "isFirstPage";
const isHome = "isHome";
const isLastPage = "isLastPage";
const isOriginal = "isOriginal";
const isPrivate = "isPrivate";
const isVbr = "isVbr";
const layer = "layer";
const length = "length";
const mode = "mode";
const modeExtension = mode + "Extension";
const mpeg = "mpeg";
const mpegVersion = mpeg + "Version";

const numberAACFrames = "numberAAC" + "Frames";
const outputGain = "outputGain";
const preSkip = "preSkip";
const profile = "profile";
const profileBits = symbol();
const protection = "protection";
const rawData = "rawData";
const segments = "segments";
const subarray = "subarray";
const version = "version";
const vorbis = "vorbis";
const vorbisComments = vorbis + "Comments";
const vorbisSetup = vorbis + "Setup";

const block = "block";
const blockingStrategy = block + "ingStrategy";
const blockingStrategyBits = symbol();
const blockSize = block + "Size";
const blocksize0 = block + "size0";
const blocksize1 = block + "size1";
const blockSizeBits = symbol();

const channel = "channel";
const channelMappingFamily = channel + "MappingFamily";
const channelMappingTable = channel + "MappingTable";
const channelMode = channel + "Mode";
const channelModeBits = symbol();
const channels = channel + "s";

const copyright = "copyright";
const copyrightId = copyright + "Id";
const copyrightIdStart = copyright + "IdStart";

const frame = "frame";
const frameCount = frame + "Count";
const frameLength = frame + "Length";

const Number = "Number";
const frameNumber = frame + Number;
const framePadding = frame + "Padding";
const frameSize = frame + "Size";

const Rate = "Rate";
const inputSampleRate = "inputSample" + Rate;

const page = "page";
const pageChecksum = page + "Checksum";
const pageSegmentBytes = symbol();
const pageSegmentTable = page + "SegmentTable";
const pageSequenceNumber = page + "Sequence" + Number;

const sample = "sample";
const sampleNumber = sample + Number;
const sampleRate = sample + Rate;
const sampleRateBits = symbol();
const samples = sample + "s";

const stream = "stream";
const streamCount = stream + "Count";
const streamInfo = stream + "Info";
const streamSerialNumber = stream + "Serial" + Number;
const streamStructureVersion = stream + "StructureVersion";

const total = "total";
const totalBytesOut = total + "BytesOut";
const totalDuration = total + "Duration";
const totalSamples = total + "Samples";

// private methods
const readRawData = symbol();
const incrementRawData = symbol();
const mapCodecFrameStats = symbol();
const mapFrameStats = symbol();
const logWarning = symbol();
const logError = symbol();
const syncFrame = symbol();
const fixedLengthFrameSync = symbol();
const getHeader = symbol();
const setHeader = symbol();
const getFrame = symbol();
const parseFrame = symbol();
const parseOggPage = symbol();
const checkCodecUpdate = symbol();
const reset = symbol();
const enable = symbol();
const getHeaderFromUint8Array = symbol();
const checkFrameFooterCrc16 = symbol();

const uint8Array = Uint8Array;
const dataView = DataView;

const reserved = "reserved";
const bad = "bad";
const free = "free";
const none = "none";
const sixteenBitCRC = "16bit CRC";

module.exports = {
  channelMappings,
  lfe,
  monophonic,
  stereo,
  getChannelMapping,
  vorbisOpusChannelMapping,
  rate192000,
  rate176400,
  rate96000,
  rate88200,
  rate64000,
  rate48000,
  rate44100,
  rate32000,
  rate24000,
  rate22050,
  rate16000,
  rate12000,
  rate11025,
  rate8000,
  rate7350,
  absoluteGranulePosition,
  bandwidth,
  bitDepth,
  bitrate,
  bitrateMaximum,
  bitrateMinimum,
  bitrateNominal,
  buffer,
  bufferFullness,
  codec,
  codecFrames,
  coupledStreamCount,
  crc,
  crc16,
  crc32,
  data,
  description,
  duration,
  emphasis,
  hasOpusPadding,
  header,
  isContinuedPacket,
  isCopyrighted,
  isFirstPage,
  isHome,
  isLastPage,
  isOriginal,
  isPrivate,
  isVbr,
  layer,
  length,
  mode,
  modeExtension,
  mpeg,
  mpegVersion,
  numberAACFrames,
  outputGain,
  preSkip,
  profile,
  profileBits,
  protection,
  rawData,
  segments,
  subarray,
  version,
  vorbis,
  vorbisComments,
  vorbisSetup,
  blockingStrategy,
  blockingStrategyBits,
  blockSize,
  blocksize0,
  blocksize1,
  blockSizeBits,
  channelMappingFamily,
  channelMappingTable,
  channelMode,
  channelModeBits,
  channels,
  copyrightId,
  copyrightIdStart,
  frame,
  frameCount,
  frameLength,
  frameNumber,
  framePadding,
  frameSize,
  inputSampleRate,
  pageChecksum,
  pageSegmentBytes,
  pageSegmentTable,
  pageSequenceNumber,
  sampleNumber,
  sampleRate,
  sampleRateBits,
  samples,
  streamCount,
  streamInfo,
  streamSerialNumber,
  streamStructureVersion,
  totalBytesOut,
  totalDuration,
  totalSamples,
  readRawData,
  incrementRawData,
  mapCodecFrameStats,
  mapFrameStats,
  logWarning,
  logError,
  syncFrame,
  fixedLengthFrameSync,
  getHeader,
  setHeader,
  getFrame,
  parseFrame,
  parseOggPage,
  checkCodecUpdate,
  reset,
  enable,
  getHeaderFromUint8Array,
  checkFrameFooterCrc16,
  uint8Array,
  dataView,
  reserved,
  bad,
  free,
  none,
  sixteenBitCRC
}