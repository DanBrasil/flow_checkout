"use client";

import { useState, useMemo } from "react";
import { Product } from "@/interfaces";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

import {
  FieldSet,
  FieldLegend,
  Field,
  FieldLabel,
  FieldContent,
} from "@/components/ui/field";

interface CardPageProps {
  cardItems: Product[];
  setCardItems: React.Dispatch<React.SetStateAction<Product[]>>;
  goBack: () => void;
}

const CardPage = ({ cardItems, setCardItems, goBack }: CardPageProps) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "pix" | "boleto" | "cartao" | null
  >(null);

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const totalPrice = useMemo(
    () => cardItems.reduce((acc, item) => acc + item.price, 0),
    [cardItems]
  );

  const handleRemoveItem = (id: string) => {
    setCardItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCardChange = (field: keyof typeof cardData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardSubmit = () => {
    alert(
      `Pagamento com cartão enviado!\nTotal: R$ ${totalPrice.toFixed(
        2
      )}\nDados: ${JSON.stringify(cardData)}`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Meu Carrinho
      </h1>

      {cardItems.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-lg">
            Seu carrinho está vazio.
          </p>
          <Button className="w-full md:w-1/3" onClick={goBack}>
            Voltar
          </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 ">
            <Carousel className="w-sm" opts={{ loop: true }}>
              <CarouselPrevious />
              <CarouselContent className="h-80">
                {cardItems.map((item, idx) => (
                  <CarouselItem
                    key={`${item.id}-${idx}`}
                    className="flex justify-center items-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
            </Carousel>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <Table className="w-full border rounded-lg overflow-hidden">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cardItems.map((item, idx) => (
                  <TableRow key={`${item.id}-${idx}`}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-gray-100">
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">
                    R$ {totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>

            <FieldSet>
              <FieldLegend>Método de pagamento</FieldLegend>
              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  variant={paymentMethod === "pix" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("pix")}
                >
                  PIX
                </Button>
                <Button
                  className="flex-1"
                  variant={paymentMethod === "boleto" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("boleto")}
                >
                  Boleto
                </Button>
                <Button
                  className="flex-1"
                  variant={paymentMethod === "cartao" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("cartao")}
                >
                  Cartão
                </Button>
              </div>
            </FieldSet>

            {paymentMethod === "pix" && (
              <div className="flex flex-col items-center mt-4">
                <p className="mb-2 font-medium">
                  Escaneie o QR code para pagar via PIX:
                </p>
                <div className="p-4 bg-gray-100 rounded shadow">
                  <QRCodeSVG
                    value={`PIX://pay?amount=${totalPrice.toFixed(2)}`}
                  />
                </div>
              </div>
            )}

            {paymentMethod === "boleto" && (
              <div className="flex flex-col items-center mt-4">
                <p className="mb-2 font-medium">Boleto gerado:</p>
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded shadow">
                  <span className="text-gray-700 font-semibold">
                    PREVIEW BOLETO
                  </span>
                </div>
              </div>
            )}

            {paymentMethod === "cartao" && (
              <div className="flex flex-col gap-4 mt-4">
                <Field>
                  <FieldLabel>Número do cartão</FieldLabel>
                  <FieldContent>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={(e) =>
                        handleCardChange("number", e.target.value)
                      }
                    />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>Nome no cartão</FieldLabel>
                  <FieldContent>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      placeholder="Nome impresso no cartão"
                      value={cardData.name}
                      onChange={(e) => handleCardChange("name", e.target.value)}
                    />
                  </FieldContent>
                </Field>
                <div className="flex gap-4">
                  <Field className="flex-1">
                    <FieldLabel>Validade</FieldLabel>
                    <FieldContent>
                      <input
                        type="text"
                        className="w-full border rounded px-2 py-1"
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) =>
                          handleCardChange("expiry", e.target.value)
                        }
                      />
                    </FieldContent>
                  </Field>
                  <Field className="flex-1">
                    <FieldLabel>CVV</FieldLabel>
                    <FieldContent>
                      <input
                        type="text"
                        className="w-full border rounded px-2 py-1"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) =>
                          handleCardChange("cvv", e.target.value)
                        }
                      />
                    </FieldContent>
                  </Field>
                </div>
                <Button className="w-full mt-2" onClick={handleCardSubmit}>
                  Pagar
                </Button>
              </div>
            )}

            <Button className="mt-6 w-full md:w-1/2" onClick={goBack}>
              Voltar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPage;
