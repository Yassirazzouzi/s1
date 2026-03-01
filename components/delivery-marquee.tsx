export function DeliveryMarquee() {
  const items = [
    { text: "Satisfaction Garantie", flag: false },
    { text: "Livraison Gratuite A Partir de 350 dh de la commande", flag: true },
    { text: "Satisfaction Garantie", flag: false },
    { text: "Livraison Gratuite A Partir de 350 dh de la commande", flag: true },
  ]

  return (
    <div className="bg-[#1a1a1a] text-white py-3 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="mx-8 flex items-center gap-2 text-sm">
            {item.flag && <span className="text-xs">🇲🇦</span>}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
