import { Request, Response } from 'express'
import { Subscription } from '../models/subscription.model'

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId })
    res.json(subscriptions)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const allSubscriptions = await Subscription.find({})
    res.json(allSubscriptions)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const createSubscription = async (req: Request, res: Response) => {
  const subscription = new Subscription({
    userId: req.body.userId,
    name: req.body.name,
    price: req.body.price,
    isActive: req.body.isActive,
    dueDate: req.body.dueDate,
  })

  try {
    const newSubscription = await subscription.save()
    res.status(201).json(newSubscription)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        isActive: req.body.isActive,
        dueDate: req.body.dueDate,
      },
      { new: true }
    )
    res.json(subscription)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id)
    res.json({ message: 'Subscription deleted' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}