import { useStore } from "@/use/useStore";
import { useStore as VuexStore } from "vuex";

jest.mock('vuex')
describe("store", () => {
  // eslint-disable-next-line
  let warnSpy: jest.SpyInstance = undefined as any;
  beforeAll(() => {
    warnSpy = jest.spyOn(console, "warn").mockImplementation();
  });

  beforeEach(() => {
    warnSpy.mockReset();
  });

  afterAll(() => {
    warnSpy.mockReset();
  });

  it("should return store", () => {
    useStore();
    expect(VuexStore).toHaveBeenCalled();
  });
});