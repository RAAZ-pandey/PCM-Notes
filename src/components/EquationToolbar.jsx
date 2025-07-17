import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export const EquationToolbar = ({ onInsertSymbol }) => {
  const mathSymbols = [
    { symbol: '√', latex: '\\sqrt{x}', label: 'Square root' },
    { symbol: '∑', latex: '\\sum_{i=1}^{n}', label: 'Sum' },
    { symbol: '∫', latex: '\\int_{a}^{b}', label: 'Integral' },
    { symbol: '∞', latex: '\\infty', label: 'Infinity' },
    { symbol: 'π', latex: '\\pi', label: 'Pi' },
    { symbol: '±', latex: '\\pm', label: 'Plus minus' },
    { symbol: '≤', latex: '\\leq', label: 'Less equal' },
    { symbol: '≥', latex: '\\geq', label: 'Greater equal' },
    { symbol: '≠', latex: '\\neq', label: 'Not equal' },
    { symbol: '≈', latex: '\\approx', label: 'Approximately' },
    { symbol: '∆', latex: '\\Delta', label: 'Delta' },
    { symbol: 'α', latex: '\\alpha', label: 'Alpha' },
    { symbol: 'β', latex: '\\beta', label: 'Beta' },
    { symbol: 'γ', latex: '\\gamma', label: 'Gamma' },
    { symbol: 'θ', latex: '\\theta', label: 'Theta' },
    { symbol: 'λ', latex: '\\lambda', label: 'Lambda' },
  ];

  const fractions = [
    { symbol: '½', latex: '\\frac{1}{2}', label: 'One half' },
    { symbol: '⅓', latex: '\\frac{1}{3}', label: 'One third' },
    { symbol: '¼', latex: '\\frac{1}{4}', label: 'One quarter' },
    { symbol: 'a/b', latex: '\\frac{a}{b}', label: 'Fraction' },
  ];

  const powers = [
    { symbol: 'x²', latex: 'x^{2}', label: 'Square' },
    { symbol: 'x³', latex: 'x^{3}', label: 'Cube' },
    { symbol: 'xⁿ', latex: 'x^{n}', label: 'Power' },
    { symbol: 'e^x', latex: 'e^{x}', label: 'Exponential' },
    { symbol: '₁', latex: 'x_{1}', label: 'Subscript' },
    { symbol: 'log', latex: '\\log', label: 'Logarithm' },
    { symbol: 'ln', latex: '\\ln', label: 'Natural log' },
    { symbol: 'sin', latex: '\\sin', label: 'Sine' },
    { symbol: 'cos', latex: '\\cos', label: 'Cosine' },
    { symbol: 'tan', latex: '\\tan', label: 'Tangent' },
  ];

  const matrices = [
    { symbol: '[ ]', latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}', label: '2x2 Matrix' },
    { symbol: '( )', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}', label: '2x2 Parentheses' },
    { symbol: '| |', latex: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}', label: 'Determinant' },
  ];

  const chemistry = [
    { symbol: 'H₂O', latex: 'H_2O', label: 'Water' },
    { symbol: 'CO₂', latex: 'CO_2', label: 'Carbon dioxide' },
    { symbol: 'NH₃', latex: 'NH_3', label: 'Ammonia' },
    { symbol: 'O₂', latex: 'O_2', label: 'Oxygen' },
    { symbol: '→', latex: '\\rightarrow', label: 'Reaction arrow' },
    { symbol: '⇌', latex: '\\rightleftharpoons', label: 'Equilibrium' },
    { symbol: 'Δ', latex: '\\Delta', label: 'Heat/Change' },
    { symbol: '⊕', latex: '\\oplus', label: 'Direct sum' },
    { symbol: '[  ]', latex: '[\\text{concentration}]', label: 'Concentration' },
  ];

  const SymbolButton = ({ item }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onInsertSymbol(`$${item.latex}$`)}
      title={item.label}
      className="h-8 min-w-[40px] text-sm hover:bg-blue-50 hover:border-blue-300"
    >
      {item.symbol}
    </Button>
  );

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-3">
        <Tabs defaultValue="math" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-3">
            <TabsTrigger value="math" className="text-xs">Math</TabsTrigger>
            <TabsTrigger value="fractions" className="text-xs">Fractions</TabsTrigger>
            <TabsTrigger value="powers" className="text-xs">Powers</TabsTrigger>
            <TabsTrigger value="matrices" className="text-xs">Matrices</TabsTrigger>
            <TabsTrigger value="chemistry" className="text-xs">Chemistry</TabsTrigger>
          </TabsList>

          <TabsContent value="math" className="mt-0">
            <div className="grid grid-cols-8 gap-1">
              {mathSymbols.map((item, index) => (
                <SymbolButton key={index} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fractions" className="mt-0">
            <div className="grid grid-cols-8 gap-1">
              {fractions.map((item, index) => (
                <SymbolButton key={index} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="powers" className="mt-0">
            <div className="grid grid-cols-8 gap-1">
              {powers.map((item, index) => (
                <SymbolButton key={index} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matrices" className="mt-0">
            <div className="grid grid-cols-8 gap-1">
              {matrices.map((item, index) => (
                <SymbolButton key={index} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chemistry" className="mt-0">
            <div className="grid grid-cols-8 gap-1">
              {chemistry.map((item, index) => (
                <SymbolButton key={index} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-2" />
        
        <div className="flex flex-wrap gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onInsertSymbol('$$\n\n$$')}
            className="text-xs hover:bg-green-50 hover:border-green-300"
          >
            Block Equation
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onInsertSymbol('$  $')}
            className="text-xs hover:bg-green-50 hover:border-green-300"
          >
            Inline Equation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
