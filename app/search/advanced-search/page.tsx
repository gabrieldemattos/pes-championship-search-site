"use client";

import { allPositions, stars, status } from "@/app/_constants/status";
import { useState } from "react";
import { FilterRange } from "./_components/filter-range";
import { FootSelect } from "./_components/foot-select";
import { FilterPositions } from "./_components/filter-positions";
import { FilterStars } from "./_components/filter-stars";
import { useRouter } from "next/navigation";

interface Filters {
  [key: string]: { min: number; max: number };
}

interface Height {
  min?: number;
  max?: number;
}

const AdvancedSearch = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [positions, setPositions] = useState<string[]>([]);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [foot, setFoot] = useState<string>("");
  const [height, setHeight] = useState<Height>({});

  const router = useRouter();

  const handleRangeChange = (
    status: string,
    minOrMax: string,
    value: number
  ) => {
    const isSpecialStatus = [
      "conditionFitness",
      "weakFootAccuracy",
      "weakFootFrequency",
    ].includes(status);

    const minValue = 1;
    const maxValue = isSpecialStatus ? 8 : 99;

    const adjustedValue = Math.max(minValue, Math.min(value, maxValue));

    setFilters((prev) => ({
      ...prev,
      [status]: {
        ...prev[status],
        [minOrMax]: value === 0 ? 0 : adjustedValue,
      },
    }));
  };

  const handleHeight = (status: string, minOrMax: string, value: number) => {
    const minValue = 160;
    const maxValue = 210;

    const adjustedValue = Math.max(minValue, Math.min(value, maxValue));

    setHeight((prev) => ({
      ...prev,
      [minOrMax]: value === 0 ? 0 : adjustedValue,
    }));
  };

  const clearFilter = (status: string) => {
    if (status === "height") {
      setHeight({ min: 0, max: 0 });
    } else {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[status];
        return newFilters;
      });
    }

    const inputs = document.querySelectorAll<HTMLInputElement>(
      `[data-status='${status}']`
    );
    inputs.forEach((input) => (input.value = ""));
  };

  const togglePosition = (position: string) => {
    setPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    );
  };

  const toggleStar = (star: string) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const handleSearch = () => {
    if (
      Object.keys(filters).length === 0 &&
      positions.length === 0 &&
      selectedStars.length === 0 &&
      (!height ||
        (height.min === undefined && height.max === undefined) ||
        (height.min === 0 && height.max === 0)) &&
      foot === ""
    ) {
      return alert("Nenhum filtro selecionado!");
    }

    // Montando a query string
    const queryParams = new URLSearchParams();

    if (Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, value]) => {
        queryParams.append(key, JSON.stringify(value));
      });
    }

    if (positions.length > 0) {
      queryParams.append("positions", positions.join(","));
    }

    if (selectedStars.length > 0) {
      queryParams.append("stars", selectedStars.join(","));
    }

    if (height.min !== undefined || height.max !== undefined) {
      queryParams.append("height", JSON.stringify(height));
    }

    if (foot) {
      queryParams.append("foot", foot);
    }

    // Redirecionando para a página com os filtros aplicados
    router.push(`/search/advanced-search/results?${queryParams.toString()}`);
  };

  const clearAll = () => {
    setFilters({});
    setPositions([]);
    setSelectedStars([]);
    setFoot("");
    setHeight({ min: 0, max: 0 });

    const inputs = document.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => (input.value = ""));
    return;
  };

  return (
    <div className="py-6 min-h-screen px-5 md:px-20 lg:px-32 xl:w-[90%] 2xl:w-[70%]">
      <h1 className="text-2xl font-bold mb-4">Busca Avançada</h1>

      <p className="text-sm pt-2 pb-5 text-red-500 font-bold">
        OBS:{" "}
        <span className="underline uppercase">
          O valor máximo nunca pode ser menor que o valor mínimo
        </span>
        , caso contrário, não encontrará nenhum jogador. Caso coloque pontos ou
        letras, também não encontrará jogador.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-col md:grid-rows-17 gap-3 lg:grid-cols-3">
        {status.map(({ status, label }) => (
          <FilterRange
            key={status}
            status={status}
            label={label}
            onRangeChange={handleRangeChange}
            onClearFilter={() => clearFilter(String(status))}
            isSpecialStatus={
              status === "conditionFitness"
                ? true
                : false || status === "weakFootAccuracy"
                ? true
                : false || status === "weakFootFrequency"
                ? true
                : false
            }
          />
        ))}

        <FilterRange
          status="height"
          label="Altura (cm)"
          onRangeChange={handleHeight}
          onClearFilter={() => clearFilter("height")}
          isHeight={true}
        />

        <FootSelect
          label="Pé Bom"
          value={foot}
          onChange={setFoot}
          onClearFilter={() => setFoot("")}
        />
      </div>

      <h2 className="text-xl font-bold mt-6">Filter by Position</h2>

      <FilterPositions
        positions={positions}
        togglePosition={togglePosition}
        allPositions={allPositions}
      />

      <h2 className="text-xl font-bold mt-6">Filter by Stars</h2>

      <FilterStars
        stars={stars}
        toggleStar={toggleStar}
        selectedStars={selectedStars}
      />

      <div className="flex flex-col gap-3 mt-6 lg:flex-row">
        <button
          onClick={handleSearch}
          className="p-3 bg-blue-600 text-white font-bold rounded shadow w-full lg:w-1/2"
        >
          Filtrar
        </button>

        <button
          onClick={clearAll}
          className="p-3 bg-red-600 text-white font-bold rounded shadow w-full lg:w-1/2"
        >
          Limpar Todos os Filtros
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
