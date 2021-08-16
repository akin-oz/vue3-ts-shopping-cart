import { useAxios } from "@/use/useAxios";
import flushPromises from 'flush-promises';
import * as api from '@/services';

let getActivities: jest.SpyInstance = undefined as any;
getActivities = jest.spyOn(api.default, 'getActivities').mockImplementation(jest.fn());

describe("axios", () => {
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

  it("should return data", () => {
    const use = useAxios(
      'getActivities',
      {
        offset: 0,
        limit: 6,
        venue_in: '164'
      }
    );

    expect(use).toMatchObject({
      data: { value: {}},
      loading: { value: false },
      error: { value: {} },
      getData: expect.any(Function),
    });
  });

  it("should call getData and get correct data", async () => {
    const use = useAxios(
      'getActivities',
      {
        offset: 0,
        limit: 6,
        venue_in: '164'
      }
    );
    const mockData = {
      meta: { count: 1 },
      data: { title: "Tour di un'intera giornata a Roma con Colosseo, Musei Vaticani e realtà virtuale" }
    }
    getActivities.mockResolvedValueOnce(mockData);
    await use.getData();
    await flushPromises();
    
    expect(use.data.value).toMatchObject(mockData.data);

  })

  it("should call getData and throw error", async () => {
    const use = useAxios(
      'getActivities',
      {
        offset: -1,
        limit: 6,
        venue_in: '164'
      }
    );
    const mockError = {
        code: "0",
        message: "Parameter \"offset\" of value \"-1\" violated a constraint \"Parameter 'offset' value, does not match requirements '\\d+'\""
    }
    getActivities.mockRejectedValueOnce(mockError);
    await use.getData();
    await flushPromises();
    
    expect(use.error.value).toMatchObject(mockError);

  })
});