// Mapa para rastrear llamadas a funciones
const mockCalls = new Map();

const Notice = jest.fn().mockImplementation((message) => {
  mockCalls.set('Notice', [...(mockCalls.get('Notice') || []), message]);
});

const mockVault = {
  read: jest.fn(),
  write: jest.fn(),
  modify: jest.fn(),
  getAbstractFileByPath: jest.fn(),
  cachedRead: jest.fn().mockResolvedValue(''),
};

const mockWorkspace = {
  getActiveFile: jest.fn(),
  getLeaf: jest.fn(),
  activeLeaf: {
    view: {
      editor: {
        getValue: jest.fn().mockReturnValue(''),
        setValue: jest.fn(),
      },
    },
  },
};

const mockMetadataCache = {
  getFileCache: jest.fn(),
};

const mockFileManager = {
  processFrontMatter: jest.fn(),
};

const App = {
  vault: mockVault,
  workspace: mockWorkspace,
  metadataCache: mockMetadataCache,
  fileManager: mockFileManager,
};

const Plugin = class {
  constructor() {
    this.app = App;
    this.settings = {};
    this.saveSettings = jest.fn();
  }
};

module.exports = {
  App,
  Plugin,
  Notice,
  mockCalls, // Para hacer assertions
  mockVault,
  mockWorkspace,
  mockMetadataCache,
  mockFileManager,
};