import { DocumentType } from "avatax/lib/enums/DocumentType";
import { describe, expect, it } from "vitest";
import { CalculateTaxesPayload } from "../../webhooks/payloads/calculate-taxes-payload";
import { AvataxCalculateTaxesMockGenerator } from "./avatax-calculate-taxes-mock-generator";
import { AvataxCalculateTaxesPayloadTransformer } from "./avatax-calculate-taxes-payload-transformer";

const mockGenerator = new AvataxCalculateTaxesMockGenerator();
const avataxConfigMock = mockGenerator.generateAvataxConfig();

describe("AvataxCalculateTaxesPayloadTransformer", () => {
  it("returns document type of SalesInvoice", async () => {
    const taxBaseMock = mockGenerator.generateTaxBase();
    const matchesMock = mockGenerator.generateTaxCodeMatches();
    const payloadMock = {
      taxBase: taxBaseMock,
      issuingPrincipal: {
        __typename: "User",
        id: "1",
      },
    } as unknown as CalculateTaxesPayload;

    const payload = await new AvataxCalculateTaxesPayloadTransformer().transform(
      payloadMock,
      avataxConfigMock,
      matchesMock,
    );

    expect(payload.model.type).toBe(DocumentType.SalesOrder);
  });
});
